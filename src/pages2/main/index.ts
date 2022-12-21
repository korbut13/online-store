// import Page from '../../core/templates/page';
// import CardProduct from '../../pages/cardProduct/cardProduct';
// import { createAllCards } from '../../pages/cardProduct/allCards'
// import { data } from '../../data/getData'

// class MainPage extends Page {
// 	static TextObject = {
// 		MainTitle: "Main paige"
// 	};
// 	constructor(id: string) {
// 		super(id);
// 	}

// 	render() {
// 		const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
// 		this.container.append(title);
// 		return this.container
// 	}
// }
// export default MainPage;
import CardProduct from '../../pages/cardProduct/cardProduct';
import { data } from '../../data/getData'
// import cardExemp from '../../pages/cardProduct/allCards'


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


