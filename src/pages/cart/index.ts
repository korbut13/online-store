import { data, IProduct } from '../../core/components/data/getsData';
import Page from '../../core/templates/page';
import { countProductsInCart, getProductsInCart } from '../../utils/helpers';
import App, { PageIds } from '../app';
import './index.css';

class CartPage extends Page {
  static TextObject = {
    CartTitle: 'Cart Page',
  };

  totalPrice: number[] = [];

  constructor(id: string) {
    super(id);
  }

  checkCart() {
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

      orderInfo.innerHTML = `
      <h2 class="cart__total">Products: ${countProductsInCart(App.chosenProducts)}</h2>`;

      productsContainer.append(containerCards, orderInfo);
      cartPage.append(title, productsContainer, paginationContainer);
      this.pagination();
    } else {
      cartPage.append(title, emptyCartMsg, backBtn);
    }
    this.container.append(cartPage);
  }

  render() {
    this.checkCart();
    this.incrementProducts();

    return this.container;
  }

  incrementProducts() {
    const plusButtonsCollection = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('plus-btn');
    const totalAmount = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('cart__total');
    for (let i = 0; i < plusButtonsCollection.length; i++) {
      plusButtonsCollection[i].addEventListener('click', (e) => {
        const plusBtn = <EventTarget>e.target;
        const plusBtnId = (<HTMLButtonElement>plusBtn).dataset.key;
        const productAmount = (<ChildNode>(<Node>plusBtn).previousSibling).previousSibling;
        if (plusBtnId && productAmount) {
          App.chosenProducts[plusBtnId]++;
          productAmount.textContent = `${App.chosenProducts[plusBtnId]}`;
          totalAmount[0].innerText = `Products: ${countProductsInCart(App.chosenProducts)}`;
          localStorage.setItem('productsInCart', JSON.stringify(App.chosenProducts));
        }
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
                  <button class='controls__info-btn minus-btn'>-</button>
                  <p class="card__info-quantity">${App.chosenProducts[elem.id]}</p>
                  <button class='controls__info-btn plus-btn' data-key=${elem.id}>+</button>
                </div>
                <h3 class="card__info-title">€${elem.price * App.chosenProducts[elem.id]}</h3>
              </div>
            </div>
          `;
        if (cards instanceof HTMLElement) {
          cards.innerHTML += item;
        }
      });
      this.incrementProducts();
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
  }
}

export default CartPage;
