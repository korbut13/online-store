import { data, IProduct } from '../../core/components/data/getsData';
import Page from '../../core/templates/page';
import { countProductsInCart, getProductsInCart } from '../../utils/helpers';
import App, { PageIds } from '../app';
import './index.css';
import americanExpress from '../../assets/icons/payment-systems/american-express.png';
import defaultSystemIcon from '../../assets/icons/payment-systems/default.png';
import Visa from '../../assets/icons/payment-systems/visa.png';
import Mastercard from '../../assets/icons/payment-systems/mastercard.png';

export enum InputValidationError {
  nameError = 'The name and surname should have more than 3 letters',
  phoneError = 'The phone number should start from "+" and have 9 - 12 numbers',
  addressError = 'The address should consist of 3 words with minimal length 5 each',
  emailError = 'Enter valid email',
  cvvError = 'Enter only numbers',
  dataError = 'Enter valid data',
}

export enum PaymentSystem {
  AMERICAN_EXPRESS = '3',
  VISA = '4',
  MASTERCARD = '5',
}

class CartPage extends Page {
  static TextObject = {
    CartTitle: 'Cart Page',
  };

  static allProducts = data;
  totalPrice: number[] = [];

  constructor(id: string) {
    super(id);
  }

  checkCart(): void {
    const title = this.createTitle(CartPage.TextObject.CartTitle);
    title.classList.add('cart__title');

    const cartPage = <HTMLElement>document.createElement('section');
    cartPage.classList.add('cart__wrapper');

    const emptyCartMsg = <HTMLParagraphElement>document.createElement('p');
    emptyCartMsg.classList.add('cart__text');
    emptyCartMsg.innerText = 'Your cart is empty';

    const backBtn = <HTMLButtonElement>document.createElement('button');
    backBtn.classList.add('button', 'back__button');
    backBtn.innerText = 'return to catalog';
    backBtn.addEventListener('click', () => {
      window.location.hash = PageIds.CatalogPage;
    });

    const productsContainer = <HTMLDivElement>document.createElement('div');
    productsContainer.classList.add('products__container');

    const orderInfo = <HTMLDivElement>document.createElement('div');
    orderInfo.classList.add('order__info');

    const containerCards = <HTMLElement>document.createElement('div');
    containerCards.classList.add('cards__container');

    const paginationContainer = <HTMLElement>document.createElement('div');
    paginationContainer.classList.add('pagination__container');

    const paginationElements = <HTMLElement>document.createElement('div');
    paginationElements.classList.add('pagination__controls');

    paginationContainer.append(paginationElements);

    if (localStorage.getItem('productsInCart') !== null) {
      App.chosenProducts = JSON.parse(localStorage.getItem('productsInCart') || App.chosenProducts.toString());

      const buyBtn = <HTMLButtonElement>document.createElement('button');
      buyBtn.classList.add('cart__button');
      buyBtn.innerText = 'BUY NOW';
      buyBtn.addEventListener('click', () => {
        this.showModal();
      });

      orderInfo.innerHTML = `
      <h2 class="cart__total">Products: ${countProductsInCart(App.chosenProducts)}</h2>
      <h2 class="cart__total cart__total-price" id='total'>Total: €</h2>
      <h2 class="cart__total cart__promo-price" id='promo-total'>Total: €100</h2>
      <div class="promo__container" id="promo__container">
        <input class="promo__container-input" id="promo" type="search" placeholder="Enter promo code">
        <span class="promo__container-info">Promo for test 'rs'</span>
       </div>`;

      orderInfo.append(buyBtn);
      productsContainer.append(containerCards, orderInfo);
      cartPage.append(title, productsContainer, paginationContainer);
      this.pagination();
    } else {
      cartPage.append(title, emptyCartMsg, backBtn);
    }
    this.container.append(cartPage);
  }

  render(): HTMLElement {
    this.checkCart();

    return this.container;
  }

  incrementProducts(): void {
    const plusButtonsCollection = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('plus-btn');
    const totalAmount = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('cart__total');
    for (let i = 0; i < plusButtonsCollection.length; i++) {
      plusButtonsCollection[i].addEventListener('click', (e) => {
        const plusBtn = <EventTarget>e.target;
        const plusBtnId = `${(<HTMLButtonElement>plusBtn).dataset.key}`;
        const productAmount = (<ChildNode>(<Node>plusBtn).previousSibling).previousSibling;
        const productPriceTotal = (<HTMLElement>(<ChildNode>(<Node>plusBtn).parentElement)).nextElementSibling;
        if (plusBtnId && productAmount) {
          App.chosenProducts[plusBtnId]++;
          productAmount.textContent = `${App.chosenProducts[plusBtnId]}`;
          totalAmount[0].innerText = `Products: ${countProductsInCart(App.chosenProducts)}`;
          const productPrice = CartPage.allProducts.products[+plusBtnId].price;
          (<HTMLElement>productPriceTotal).innerText = `€${productPrice * App.chosenProducts[plusBtnId]}`;
          localStorage.setItem('productsInCart', JSON.stringify(App.chosenProducts));
        }
        this.showTotalPrice();
      });
    }
  }

  decrementProducts(): void {
    const minusButtonsCollection = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('minus-btn');
    const totalAmount = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('cart__total');
    for (let i = 0; i < minusButtonsCollection.length; i++) {
      minusButtonsCollection[i].addEventListener('click', (e) => {
        const minusBtn = <EventTarget>e.target;
        const minusBtnId = (<HTMLButtonElement>minusBtn).dataset.key;
        const productAmount = (<ChildNode>(<Node>minusBtn).nextSibling).nextSibling;
        const productPriceTotal = (<HTMLElement>(<ChildNode>(<Node>minusBtn).parentElement)).nextElementSibling;
        if (minusBtnId && productAmount) {
          if (App.chosenProducts[minusBtnId] > 1) {
            App.chosenProducts[minusBtnId]--;
            const productPrice = CartPage.allProducts.products[+minusBtnId].price;
            productAmount.textContent = `${App.chosenProducts[minusBtnId]}`;
            (<HTMLElement>productPriceTotal).innerText = `€${productPrice * App.chosenProducts[minusBtnId]}`;
            totalAmount[0].innerText = `Products: ${countProductsInCart(App.chosenProducts)}`;
            localStorage.setItem('productsInCart', JSON.stringify(App.chosenProducts));
          } else {
            delete App.chosenProducts[minusBtnId];
            localStorage.setItem('productsInCart', JSON.stringify(App.chosenProducts));
            (<HTMLElement>document.getElementsByClassName('cards__container').item(0)).innerHTML = '';
            (<HTMLElement>document.querySelector('.pagination__controls')).innerHTML = '';
            this.pagination();
          }
        }
        this.showTotalPrice();
      });
    }
  }

  async pagination() {
    const data = [...(await getProductsInCart(App.chosenProducts))];
    let currentPage = 1;
    let rows = 3;
    const displayList = (arrData: IProduct[], rowPerPage: number, page: number) => {
      const cards = document.getElementsByClassName('cards__container').item(0);
      if (cards instanceof HTMLElement) {
        cards.innerHTML = '';
      }
      page--;
      const start = rowPerPage * page;
      const end = start + rowPerPage;
      const paginatedData = arrData.slice(start, end);
      paginatedData.forEach((elem: IProduct, index: number) => {
        const item = `
            <div class="card__info" data-key=${elem.id}>
              <div class="card__info-container">
                <img class="card__info-img" src=${elem.images[0]} alt=${elem.title} />
              </div>
              <div class="card__info-details">
                <h3 class="card__info-title">${elem.title}</h3>
                <p class="card__info-desc">${elem.description}</p>
                <p class="card__info-desc">Rating: ${elem.rating} | Discount: ${elem.discountPercentage}%</p>
              </div>
              <div class="card__info-controls">
                <p class="card__info-desc">Stock: ${elem.stock}</p>
                <div class="controls__info">
                  <button class='controls__info-btn minus-btn' data-key=${elem.id}>-</button>
                  <p class="card__info-quantity">${App.chosenProducts[elem.id]}</p>
                  <button class='controls__info-btn plus-btn' data-key=${elem.id}>+</button>
                </div>
                <h3 class="card__info-title" id="product-price">€${elem.price * App.chosenProducts[elem.id]}</h3>
              </div>
            </div>
          `;
        if (cards instanceof HTMLElement) {
          cards.innerHTML += item;
        }
      });
      this.incrementProducts();
      this.decrementProducts();
    };

    const displayPagination = (arrData: IProduct[], rowPerPage: number) => {
      const paginationBtns = document.querySelector('.pagination__controls');
      const pagesCount = Math.ceil(arrData.length / rowPerPage);

      for (let i = 0; i < pagesCount; i++) {
        const button = displayPaginationBtn(i + 1);
        if (paginationBtns instanceof HTMLElement) {
          paginationBtns.appendChild(button);
        }
      }
    };

    const displayPaginationBtn = (page: number) => {
      const button = document.createElement('button');
      button.classList.add('pagination__btn');
      button.innerText = `${page}`;

      button.addEventListener('click', () => {
        currentPage = page;
        displayList(data, rows, currentPage);
      });
      return button;
    };

    displayList(data, rows, currentPage);
    displayPagination(data, rows);
    this.showTotalPrice();
    this.applyDiscount();
  }

  showTotalPrice(): void {
    const totalPrices = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('cart__total-price');
    const productsIds = Object.keys(App.chosenProducts);
    const productsCount = Object.values(App.chosenProducts);
    const productsPrices: number[] = [];
    productsIds.forEach((product) => {
      productsPrices.push(CartPage.allProducts.products[+product].price);
    });
    this.totalPrice = Array.apply(0, Array(productsCount.length)).map(
      (item, index) => productsCount[index] * productsPrices[index]
    );
    totalPrices[0].innerText = `Total: €${this.totalPrice.reduce((acc, val) => acc + val, 0)}`;
  }

  applyDiscount(): void {
    const oldTotalPrice = <HTMLElement>document.getElementById('total');
    const totalPriceWithDiscount = <HTMLElement>document.getElementById('promo-total');
    const discount = <HTMLInputElement>document.getElementById('promo');
    const totalProductsPrice = this.totalPrice.reduce((acc, val) => acc + val, 0);
    discount.addEventListener('input', (e) => {
      if (discount.value === 'rs'.toLowerCase()) {
        this.createAppliedPromo('rs');
        oldTotalPrice.classList.add('old');
        totalPriceWithDiscount.classList.add('new');
        totalPriceWithDiscount.innerText = `Total: €${(totalProductsPrice * 0.9).toFixed(0)}`;
      } else if (discount.value === 'shop'.toLowerCase()) {
        this.createAppliedPromo('shop');
        oldTotalPrice.classList.add('old');
        totalPriceWithDiscount.classList.add('new');
        totalPriceWithDiscount.innerText = `Total: €${(totalProductsPrice * 0.9).toFixed(0)}`;
      } else if (!discount.value) {
        const dropBtn = <HTMLElement>document.getElementById('rs-drop-btn');
        dropBtn.addEventListener('click', (e) => {
          oldTotalPrice.classList.remove('old');
          totalPriceWithDiscount.classList.remove('new');
          (<HTMLElement>document.getElementsByClassName('applied-promo__container')[0]).remove();
        });
      }
    });
  }

  createAppliedPromo(promoValue: string): void {
    const appliedPromoContainer = <HTMLElement>document.createElement('div');
    appliedPromoContainer.classList.add('applied-promo__container');
    const fullPromoName = promoValue === 'rs' ? 'Rolling Scopes School' : 'Online Shop';
    const discount = '10%';

    const promoContainer = <HTMLElement>document.getElementById('promo__container');
    appliedPromoContainer.innerHTML = `<h3 class='applied-promo__title'>Applied codes</h3
    <div class='applied-promo__details'>
      <p class="applied-promo__text">${fullPromoName} - ${discount}</p>
      <button class='applied-promo__btn' id='rs-drop-btn'>Drop</button>
    </div>`;
    promoContainer.insertAdjacentElement('beforebegin', appliedPromoContainer);
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
}

export default CartPage;
