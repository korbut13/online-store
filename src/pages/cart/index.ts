import Page from '../../core/templates/page';
import { PageIds } from '../app';
import './index.css';

class CartPage extends Page {
  static TextObject = {
    CartTitle: 'Cart Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
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

    cartPage.append(title, emptyCartMsg, backBtn);
    this.container.append(cartPage);
    return this.container;
  }
}

export default CartPage;
