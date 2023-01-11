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

        const authors = <HTMLDivElement>document.createElement('div');
        authors.classList.add('authors')
        authors.innerHTML = `<div class="authors_links">
        <a href="https://github.com/korbut13" class="authors_link">Svetlana</a>
        <a href="https://github.com/Shrai-dev" class="authors_link">Anastasia</a>
    </div>
    <p class="year">2023</p>
    <div class="rs">
        <a href="https://rs.school/js/" class="rs_link">
            <div class="rs_img"></div>
        </a>
    </div>`;

        footerWrapper.append(logoContainer);
        footerWrapper.append(authors);
        footerContainer.append(footerWrapper);
        this.container.append(footerContainer);
    }

    render() {
        this.renderPage();
        return this.container;
    }
}

export default Footer;
