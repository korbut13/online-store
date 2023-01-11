import App, { PageIds } from '../../../pages/app';
import { countProductsInCart } from '../../../utils/helpers';
import Component from '../../templates/components';
import './index.css';

const Buttons = [
  {
    id: PageIds.CatalogPage,
    text: 'Catalog',
  },
  {
    id: PageIds.CartPage,
    text: 'Cart',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPage() {
    const headerContainer = <HTMLDivElement>document.createElement('div');
    headerContainer.classList.add('container');

    const headerWrapper = <HTMLDivElement>document.createElement('div');
    headerWrapper.classList.add('header__wrapper');

    const logoContainer = <HTMLDivElement>document.createElement('div');
    logoContainer.classList.add('header__logo', 'logo');

    const cartTotal = <HTMLParagraphElement>document.createElement('p');
    cartTotal.classList.add('cart__total-price');

    const productsInCart = document.createElement('span');
    productsInCart.classList.add('product__count');
    productsInCart.innerHTML = `${countProductsInCart(App.chosenProducts)}`;

    const pageButtons = <HTMLElement>document.createElement('nav');
    pageButtons.classList.add('header__nav');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });

    headerWrapper.append(logoContainer, cartTotal, pageButtons, productsInCart);
    headerContainer.append(headerWrapper);
    this.container.append(headerContainer);
  }

  render() {
    this.renderPage();
    return this.container;
  }
}

export default Header;
