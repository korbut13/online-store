import Page from '../../core/templates/page';

class CartPage extends Page {
  static TextObject = {
    CartTitle: 'Cart Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(CartPage.TextObject.CartTitle);
    this.container.append(title);
    return this.container;
  }
}

export default CartPage;
