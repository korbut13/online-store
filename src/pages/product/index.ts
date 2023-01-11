import Page from "../../core/templates/page";
import './style.css';
import Product from "../../core/templates/product";
import { IProduct } from '../../core/components/data/getsData';
import defaultSystemIcon from '../../assets/icons/payment-systems/default.png';
import { DataObject, data } from '../../core/components/data/getsData';
import App from "../app";
import { InputValidationError } from "../cart";
import { PageIds } from "../app";
import { PaymentSystem } from "../cart";
import americanExpress from '../../assets/icons/payment-systems/american-express.png';
import Visa from '../../assets/icons/payment-systems/visa.png';
import Mastercard from '../../assets/icons/payment-systems/mastercard.png';

class ProductPage extends Page {
    static TextObject = {
        MainTitle: 'Product Page',
    };
    data = data;
    private product: Product;

    constructor(id: string) {
        super(id);
        this.product = new Product(id);
    }

    createProduct(obj: IProduct) {
        const containerForProduct = <HTMLElement>this.container.querySelector('.product');
        this.product = new Product(`${obj.id}`);
        const changeProduct = this.product.renderProduct(obj.title, obj.images, obj.images[obj.images.length - 1], obj.description, obj.discountPercentage, obj.rating,
            obj.stock, obj.brand, obj.category, obj.price);
        containerForProduct.append(changeProduct);

    }

    showModal() {
        const overlay = <HTMLDivElement>document.createElement('div');
        overlay.classList.add('overlay');

        const modalContainer = <HTMLDivElement>document.createElement('div');
        modalContainer.classList.add('modal__container');

        modalContainer.innerHTML = `
        <form>
          <div class='personal-details__wrapper'>
            <h3 class='details__title'>Personal details</h3>
            <input class='details__input' id='name' type='text' placeholder='Name' required>
            <input class='details__input' id='phone' type='tel' placeholder='Phone number' required>
            <input class='details__input' id='address' type='text' placeholder='Delivery address' required>
            <input class='details__input' id='email' type='email' placeholder='Email' required>
          </div>
          <div class='card-details__wrapper'>
            <h3 class='details__title'>Credit card details</h3>
            <div class='payment__wrapper'>
              <img class='payment-icon' id='card-icon' src=${defaultSystemIcon} alt=''>
              <input class='details__input card__input input-number' id='card-number' type='number' placeholder='Card number' required>
            </div>
            <div class='card-params__wrapper'>
              <input class='details__input' id='valid-date' type='text' placeholder='Valid to..' required>
              <input class='details__input input-number' id='cvv' type='number' placeholder='CVV' required>
            </div>
          </div>
        </form>`;

        const errorMsg = <HTMLParagraphElement>document.createElement('p');
        errorMsg.classList.add('error');
        errorMsg.innerText = InputValidationError.dataError;

        const confirmBtn = <HTMLButtonElement>document.createElement('button');
        confirmBtn.classList.add('button', 'confirm__button');
        confirmBtn.innerText = 'confirm';
        confirmBtn.addEventListener('click', () => {
            this.validateForm() ? successOrder() : modalContainer.append(errorMsg);
        });

        modalContainer.append(confirmBtn);
        document.body.style.overflow = 'hidden';
        document.body.prepend(overlay);
        document.body.append(modalContainer);

        const cardNumberInput = <HTMLInputElement>document.getElementById('card-number');
        cardNumberInput.addEventListener('input', () => {
            const cardIcon = <HTMLImageElement>document.getElementById('card-icon');
            cardIcon.setAttribute('src', this.getPaymentSystemIcon(cardNumberInput.value));
        });

        const cardValidDateInput = <HTMLInputElement>document.getElementById('valid-date');
        cardValidDateInput.addEventListener('input', () => {
            const cardValidDateRegExp = /^[0-9]{2}\/[0-9]{2}$/;
        });

        const successOrder = () => {
            closeModal();
            setTimeout(() => {
                window.location.hash = PageIds.CatalogPage;
                App.chosenProducts = {};
                localStorage.setItem('productsInCart', JSON.stringify(App.chosenProducts));
            }, 5000);
        };

        const closeModal = (): void => {
            modalContainer.remove();
            overlay.remove();
            document.body.style.overflowY = 'scroll';
        };

        overlay.addEventListener('click', closeModal);
    }
    validateForm() {
        const nameInput = <HTMLInputElement>document.getElementById('name');
        const phoneInput = <HTMLInputElement>document.getElementById('phone');
        const addressInput = <HTMLInputElement>document.getElementById('address');
        const emailInput = <HTMLInputElement>document.getElementById('email');
        const cardNumberInput = <HTMLInputElement>document.getElementById('card-number');
        const cvvInput = <HTMLInputElement>document.getElementById('cvv');

        const nameRegExp = /^[A-Za-z]{3,} [a-zA-Z]{3,}$/;
        const phoneRegExp = /^\+[0-9]{9,12}$/;
        const addressRegExp = /^[A-Za-z]{5,} [a-zA-Z]{5,} [a-zA-Z]{5,}$/;
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cardNumberRegExp = /^[0-9]{16}$/;
        const cvvRegExp = /^[0-9]{3}$/;

        return (
            nameRegExp.test(nameInput.value) &&
            phoneRegExp.test(phoneInput.value) &&
            addressRegExp.test(addressInput.value) &&
            emailRegExp.test(emailInput.value) &&
            cardNumberRegExp.test(cardNumberInput.value) &&
            cvvRegExp.test(cvvInput.value)
        );
    }

    getPaymentSystemIcon(value: string): string {
        switch (value[0]) {
            case PaymentSystem.AMERICAN_EXPRESS:
                return americanExpress;
            case PaymentSystem.VISA:
                return Visa;
            case PaymentSystem.MASTERCARD:
                return Mastercard;
            default:
                return defaultSystemIcon;
        }
    }

    render(): HTMLElement {
        const layout = `<div class="container__product">
        <div class="wrapper">
            <div class="product"></div>
        </div>
    </div>`

        this.container.innerHTML = layout;
        const link = window.location.hash;
        const arrLink = link.split('/');
        const idProduct = +arrLink[arrLink.length - 1]
        const objProduct = this.data.products.filter((el) => el.id === idProduct);
        this.createProduct(objProduct[0]);

        const mainImg = <HTMLImageElement>this.container.querySelector('.mainImg');
        const allImages = <HTMLCollectionOf<HTMLImageElement>>this.container.getElementsByClassName('allImg');
        for (const img of allImages) {
            img.addEventListener('click', () => {
                mainImg.src = img.src;
            })
        }

        const buttons = this.container.getElementsByClassName('card__button');
        const buyNow = buttons[1];
        buyNow.addEventListener('click', () => {
            this.showModal()
        });

        return this.container
    }
}
export default ProductPage
