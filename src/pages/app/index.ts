import Page from '../../core/templates/page';
import Header from '../../core/components/header';
import MainPage from '../catalog';
import ErrorPage, { ErrorTypes } from '../error';
import CartPage from '../cart';
import Footer from '../../core/components/footer';
import Main from '../../core/components/main';

export const enum PageIds {
  CatalogPage = 'catalog-page',
  CartPage = 'cart-page',
  ProductPage = 'product-page',
  ErrorPage = 'error-page',
}

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = 'current-page';
  private header: Header;
  private footer: Footer;
  static main: Main;
  static chosenProducts: { [key: string]: number } = {};

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (
      idPage === PageIds.CatalogPage ||
      window.location.hash === '' ||
      window.location.hash.slice(1) === PageIds.CatalogPage
    ) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.CartPage || window.location.hash.slice(1) === PageIds.CartPage) {
      page = new CartPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.main.appendNewPage(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  private checkCart() {
    if (localStorage.getItem('productsInCart') !== null) {
      App.chosenProducts = JSON.parse(localStorage.getItem('productsInCart') || App.chosenProducts.toString());
    }
  }

  constructor() {
    this.header = new Header('header', 'header');
    App.main = new Main('main', 'main');
    this.footer = new Footer('footer', 'footer');
  }

  start() {
    this.enableRouteChange();
    this.checkCart();
    App.container.append(this.header.render());
    App.container.append(App.main.render());
    App.renderNewPage('/');
    App.container.append(this.footer.render());
  }
}

export default App;
