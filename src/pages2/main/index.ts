import CardProduct from '../../cards/cardProduct';
import { data } from '../../data/getData'
import Page from '../../core/templates/page';

class MainPage extends Page {
	private cardExemp: CardProduct;
	dataArray = data;
	filters = [];

	constructor(id: string) {
		super(id);
	}

	setFilters(filterValue) {
		this.filters.push(filterValue);
		console.log(this.filters)
	}

	render() {
		let sortedProducts = this.dataArray.products;


		if (this.filters.length > 0) {
			sortedProducts = this.dataArray.products.filter(el => el.category === this.filters[0]);
		}

		for (const product of sortedProducts) {
			this.cardExemp = new CardProduct('card');
			const card = this.cardExemp.createCard(product.images[0], product.title);
			this.container.append(card);
		}
		return this.container
	}
}
export default MainPage


