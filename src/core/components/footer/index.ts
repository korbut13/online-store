import Component from '../../templates/components';
import './index.css';

class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPage() {
    const footerContainer = document.createElement('div');
    footerContainer.classList.add('container');

    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('header__wrapper');

    const logoContainer = document.createElement('div');
    logoContainer.classList.add('footer__logo', 'logo');

    footerWrapper.append(logoContainer);
    footerContainer.append(footerWrapper);
    this.container.append(footerContainer);
  }

  render() {
    this.renderPage();
    return this.container;
  }
}

export default Footer;
