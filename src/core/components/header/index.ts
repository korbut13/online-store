import { PageIds } from '../../../pages/app';
import Component from '../../templates/components';
import './index.css';

const Buttons = [
  {
    id: PageIds.CatalogPage,
    text: 'Catalog Page',
  },
  {
    id: PageIds.CartPage,
    text: 'Cart Page',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPage() {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('container');

    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('header__wrapper');

    const logoContainer = document.createElement('div');
    logoContainer.classList.add('header__logo', 'logo');

    const pageButtons = document.createElement('nav');
    pageButtons.classList.add('header__nav');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });

    headerWrapper.append(logoContainer, pageButtons);
    headerContainer.append(headerWrapper);
    this.container.append(headerContainer);
  }

  render() {
    this.renderPage();
    return this.container;
  }
}

export default Header;
