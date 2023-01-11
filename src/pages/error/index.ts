import Page from '../../core/templates/page';
import { PageIds } from '../app';
import './index.css';

export const enum ErrorTypes {
  Error_404 = 404,
}

class ErrorPage extends Page {
  private errorType: ErrorTypes | string;
  static TextObject: { [prop: string]: string } = {
    '404': 'Error 404',
  };
  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    const title = this.createTitle(ErrorPage.TextObject[this.errorType]);
    title.classList.add('error__title');

    const errorPage = <HTMLElement>document.createElement('section');
    errorPage.classList.add('error__wrapper');

    const errorMsg = <HTMLParagraphElement>document.createElement('p');
    errorMsg.classList.add('error__text');
    errorMsg.innerText = 'Oops! Something went wrong...';

    const backBtn = <HTMLButtonElement>document.createElement('button');
    backBtn.classList.add('button', 'back__button');
    backBtn.innerText = 'return to catalog';
    backBtn.addEventListener('click', () => {
      window.location.hash = PageIds.CatalogPage;
    });

    errorPage.append(title, errorMsg, backBtn);
    this.container.append(errorPage);
    return this.container;
  }
}

export default ErrorPage;
