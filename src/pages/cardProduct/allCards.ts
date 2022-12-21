// import { data } from '../../data/getData'
// import CardProduct from "./cardProduct";


// export function createAllCards(obj) {
// 	let elemArray = obj[Object.keys(obj)[0]];
// 	elemArray.forEach(function (objArray) {
// 		const addCard = new CardProduct('card_elem');
// 		addCard.render(objArray.images[0], objArray.title)
// 	})
// }




// class Allcards {
// 	private container: HTMLElement;
// 	createCard: CardProduct;
// 	constructor() {
// 		this.container = document.createElement('div');
// 		this.createCard = new CardProduct('card')
// 	}
// 	createAllCards(obj) {
// 		let elemArray = obj[Object.keys(obj)[0]];
// 		elemArray.forEach(function (objArray) {
// 			const myCard = this.createCard.render(objArray.images[0], objArray.title);
// 			this.container.append(myCard)
// 		})
// 		return this.container
// 	}
// }
// export default Allcards;