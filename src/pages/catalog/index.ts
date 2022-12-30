import Page from '../../core/templates/page';
import './style.css';
import { data } from '../../core/components/data/getsData';
import CardProduct from '../../core/templates/cardProducts';
import FilterProduct from '../../core/templates/filtersProducts';
import DataObject from '../../core/components/data/getsData';

interface DataOb {
	brand: string,
	category: string,
	description: string,
	discountPercentage: number,
	id: number,
	images: [string],
	price: number,
	rating: number,
	stock: number,
	thumbnaill: string,
	title: string,
}


class CatalogPage extends Page {
	static TextObject = {
		MainTitle: 'Catalog Page',
	};
	data = data;
	filteraArray: string[] = [];
	private cardExemp: CardProduct;
	private filterCategory: FilterProduct;

	constructor(id: string) {
		super(id);
		this.cardExemp = new CardProduct(id);
		this.filterCategory = new FilterProduct('categoty__input');
	}

	getAmountOfProducts(arr: string[]): { [key: string]: number } {
		let result: { [key: string]: number } = {};
		for (let i = 0; i < arr.length; ++i) {
			let a = arr[i];
			if (result[a] != undefined) {
				++result[a];
			}
			else {
				result[a] = 1;
			}
		}
		return result;
	}

	createFilters(obj: { [key: string]: number }, renderContainer: HTMLElement, nameClass: string): void {
		Object.entries(obj).forEach(([key, value]) => {
			this.filterCategory = new FilterProduct(nameClass);
			const divCategory = this.filterCategory.renderCheckbox(key, value);
			renderContainer.append(divCategory);
		});
	}

	setFilters(filterValue: string) {
		this.filteraArray.push(filterValue);
	}

	deleteFilter(filterValue: string) {
		const index = this.filteraArray.indexOf(filterValue, 0);
		if (index !== -1) {
			this.filteraArray.splice(index, 1);

		}
		else {
			console.log('elememt not find');
		}
	}
	// async getNewData(arr1: HTMLCollectionOf<Element>, arr2: string[], arr3: DataObject) {
	// 	for (let i = 0; i < arr1.length; i++) {
	// 		if (arr2.includes(arr1[i].id)) {
	// 			return arr3.products.filter(el => arr2.includes(el.category) && arr2.includes(el.brand))
	// 		}
	// 		else {
	// 			return arr3.products.filter(el => arr2.includes(el.category) || arr2.includes(el.brand))
	// 		}
	// 	}
	// }
	async getNewData(arr1: HTMLCollectionOf<Element>, arr2: HTMLCollectionOf<Element>) {
		for (let my = 0; my < this.data.products.length; my++) {
			for (let i = 0; i < arr1.length; i++) {
				for (let j = 0; j < arr2.length; j++) {
					if (this.filteraArray.includes(arr1[i].id) && this.filteraArray.includes(arr2[j].id)) {
						console.log("НЕПРАВИЛЬНО")
						return this.data.products.filter(el => this.filteraArray.includes(el.category) && this.filteraArray.includes(el.brand))
					}
					else if (this.filteraArray.includes(arr1[i].id) && !this.filteraArray.includes(arr2[j].id)) {
						console.log("HELLO SVETA")
						return this.data.products.filter(el => this.filteraArray.includes(el.category))
					}
					else if (this.filteraArray.includes(arr2[j].id) && !this.filteraArray.includes(arr1[i].id)) {
						console.log("HELLO")
						return this.data.products.filter(el => this.filteraArray.includes(el.brand))
					}
				}
			}
		}
	}

	// getFiltredData() {
	// 	return this.data.products.filter(product => {
	// 		return this.filteraArray.includes(product.category)
	// 	})
	// }

	render(): HTMLElement {

		const layoutCatalog: string = `<main class="main">
			<article class="background">
				<div class="background__img_top"></div>
				<div class="background__img_info">
					<p class="background__text">WINTER 2023</p>
					<button class="background__buttom">TO CATALOG</button>
				</div>
				<div class="background__img_left"></div>
				<div class="background__img_right"></div>
			</article>

			<p class="main__header" id="catalog">CATALOG</p>

			<section class="products">
				<div class="container">
					<div class="products__wrapper">
						<div class="filters">
							<div class="filters__category">
								<h3 id="filters__category_header" class="filters__header">CATEGORIES</h3>
							</div>
							<div class="filters__brand">
								<h3 class="filters__header">BRANDS</h3>
							</div>
							<div class="filters__price">
								<h3 class="filters__header">PRICE</h3>
								<div class="price__out">
									<div class="out__from-data">$10</div>
									<div class="out__to-data">$150</div>
								</div>
								<div class="price__range">
									<input type="range" min="10" max="30" class="range__slider">
									<!-- <input type="range" min="10" max="30" class="range__slider"> -->
								</div>
							</div>
							<div class="filters__stock">
								<h3 class="filters__header">AVAILABLE IN STOCK</h3>
								<div class="price__out">
									<div class="out__from-data">1</div>
									<div class="out__to-data">50</div>
								</div>
								<div class="price__range">
									<input type="range" min="1" max="50" class="range__slider">
									<!-- <input type="range" min="1" max="50" class="range__slider"> -->
								</div>
							</div>
						</div>
						<div class="main__products"></div>
					</div>
				</div>
			</section>

		</main>`
		this.container.innerHTML = layoutCatalog;

		//_________________________Add cards of products to div main__products

		const containerCards = <HTMLElement>this.container.querySelector('.main__products');

		for (const product of this.data.products) {
			this.cardExemp = new CardProduct(`${product.id}`);
			const card = <HTMLElement>this.cardExemp.createCard(product.images[product.images.length - 1], product.title, product.category, product.brand, product.price, product.discountPercentage, product.rating, product.stock);
			containerCards.append(card)
		}
		//________________________Add filter by category and brand

		const containerFilterCategory = <HTMLElement>this.container.querySelector('.filters__category');
		const containerFilterBrand = <HTMLElement>this.container.querySelector('.filters__brand');

		const allCategories: string[] = this.data.products.map((elem: { category: string, }) => elem.category);
		const allBrands: string[] = this.data.products.map((elem: { brand: string, }) => elem.brand);

		const objCategory: { [key: string]: number } = this.getAmountOfProducts(allCategories);
		const objBrand: { [key: string]: number } = this.getAmountOfProducts(allBrands);

		this.createFilters(objCategory, containerFilterCategory, 'category__input');
		this.createFilters(objBrand, containerFilterBrand, 'brand__input');

		//__________________________Adding filtering functionality
		const filterCategory = this.container.getElementsByClassName('category__input');
		const filterBrand = this.container.getElementsByClassName('brand__input');

		for (const el of filterCategory) {
			el.addEventListener('click', async () => {
				if ((<HTMLInputElement>el).checked === false) {
					containerCards.innerHTML = '';
					this.deleteFilter((<HTMLInputElement>el).value);
					console.log("IT'S FILTERARRAY", this.filteraArray);
					const newData = await this.getNewData(filterCategory, filterBrand);
					console.log("IT'S NEWDATA:", newData);
					if (newData) {
						for (const product of newData) {
							this.cardExemp = new CardProduct(`${product.id}`);
							const card = <HTMLElement>this.cardExemp.createCard(product.images[product.images.length - 1], product.title, product.category, product.brand, product.price, product.discountPercentage, product.rating, product.stock);
							containerCards.append(card)
						}
					}

					// const newData = this.data.products.filter(el => this.filteraArray.includes(el.category) || this.filteraArray.includes(el.brand));
					// console.log("it's newDataProducts", newData);

					// for (const product of newData) {
					// 	this.cardExemp = new CardProduct(`${product.id}`);
					// 	const card = <HTMLElement>this.cardExemp.createCard(product.images[product.images.length - 1], product.title, product.category, product.brand, product.price, product.discountPercentage, product.rating, product.stock);
					// 	containerCards.append(card)
					// }
				}

				if ((<HTMLInputElement>el).checked === true) {
					containerCards.innerHTML = '';

					this.setFilters((<HTMLInputElement>el).value);
					console.log("IT'S FILTERARRAY", this.filteraArray);

					const newData = await this.getNewData(filterCategory, filterBrand);
					console.log("IT'S NEWDATA:", newData);
					if (newData) {
						// window.location.href = window.location.origin + "/" + el.id;
						for (const product of newData) {
							this.cardExemp = new CardProduct(`${product.id}`);
							const card = <HTMLElement>this.cardExemp.createCard(product.images[product.images.length - 1], product.title, product.category, product.brand, product.price, product.discountPercentage, product.rating, product.stock);
							containerCards.append(card)
						}
					}
				}
				if (this.filteraArray.length === 0) {
					for (const product of this.data.products) {
						this.cardExemp = new CardProduct(`${product.id}`);
						const card = <HTMLElement>this.cardExemp.createCard(product.images[product.images.length - 1], product.title, product.category, product.brand, product.price, product.discountPercentage, product.rating, product.stock);
						containerCards.append(card)
					}
				}
			})
		}

		for (const el of filterBrand) {
			el.addEventListener('click', async () => {
				if ((<HTMLInputElement>el).checked === false) {
					containerCards.innerHTML = '';
					this.deleteFilter((<HTMLInputElement>el).value);
					console.log("IT'S FILTERARRAY", this.filteraArray);
					const newData = await this.getNewData(filterCategory, filterBrand);
					console.log("IT'S NEWDATA:", newData);
					if (newData) {
						for (const product of newData) {
							this.cardExemp = new CardProduct(`${product.id}`);
							const card = <HTMLElement>this.cardExemp.createCard(product.images[product.images.length - 1], product.title, product.category, product.brand, product.price, product.discountPercentage, product.rating, product.stock);
							containerCards.append(card)
						}
					}

				}
				if ((<HTMLInputElement>el).checked === true) {
					containerCards.innerHTML = '';
					this.setFilters((<HTMLInputElement>el).value);
					console.log("IT'S FILTERARRAY", this.filteraArray);

					const newData = await this.getNewData(filterCategory, filterBrand);
					console.log("IT'S NEWDATA:", newData);
					if (newData) {
						for (const product of newData) {
							this.cardExemp = new CardProduct(`${product.id}`);
							const card = <HTMLElement>this.cardExemp.createCard(product.images[product.images.length - 1], product.title, product.category, product.brand, product.price, product.discountPercentage, product.rating, product.stock);
							containerCards.append(card)
						}
					}
				}
				if (this.filteraArray.length === 0) {
					for (const product of this.data.products) {
						this.cardExemp = new CardProduct(`${product.id}`);
						const card = <HTMLElement>this.cardExemp.createCard(product.images[product.images.length - 1], product.title, product.category, product.brand, product.price, product.discountPercentage, product.rating, product.stock);
						containerCards.append(card)
					}
				}

			})
		}


		return this.container;
	}
}
export default CatalogPage;
