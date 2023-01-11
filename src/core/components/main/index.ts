import Component from '../../templates/components';
import './index.css';

class Main extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  appendNewPage(pageHTML: HTMLElement) {
    const mainContainer = document.querySelector('main');
    if (mainContainer instanceof HTMLElement) {
      console.log(mainContainer);
      mainContainer.insertAdjacentElement('afterbegin', pageHTML);
    }
  }

  render() {
    return this.container;
  }
}

export default Main;
