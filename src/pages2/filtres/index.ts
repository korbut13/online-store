import Page from "../../core/templates/page";
import CardProduct from "../../cards/cardProduct";
import { data } from "../../data/getData";

class FiltresPage extends Page {
	private cardExemp: CardProduct;
	dataArray = data;
	static TextObject: {
		MainTitle: 'Filtres Page'
	};

	constructor(id: string) {
		super(id);
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

export default FiltresPage