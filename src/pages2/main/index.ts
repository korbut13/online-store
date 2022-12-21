import CardProduct from '../../cards/cardProduct';
import { data } from '../../data/getData'

class MainPage {

	private container: HTMLElement;
	private cardExemp: CardProduct;
	dataArray = data;
	static TextObject = {
		MainTitle: "MainPaige"
	}

	constructor(id: string) {
		this.container = document.createElement('div');
		this.container.id = id;
		this.container.classList.add('main__products');
	}

	private creatHeaderTitle(text: string) {
		const headerTitle = document.createElement('h1')
		headerTitle.innerText = text;
		return headerTitle;
	}

	render() {
		for (const product of this.dataArray.products) {
			this.cardExemp = new CardProduct('card');
			const card = this.cardExemp.createCard(product.images[0], product.title);
			this.container.append(card);
		}
		return this.container
	}
}

export default MainPage


