import Page from '../../core/templates/page';
import './style.css';
import { data } from '../../core/components/data/getsData';
import CardProduct from '../../core/templates/cardProducts';
import FilterProduct from '../../core/templates/filtersProducts';

type filtredData = {
	brand: string;
	category: string;
	description: string;
	discountPercentage: number;
	id: number;
	images: [string];
	price: number;
	rating: number;
	stock: number;
	thumbnaill: string;
	title: string;
}[];

class CatalogPage extends Page {
	static TextObject = {
		MainTitle: 'Catalog Page',
	};
	data = data;
	filteraArrCategory: string[] = [];
	filteraArrBrand: string[] = [];
	priceRange: [number, number] = [10, 1749];
	stockRange: [number, number] = [2, 150];
	private cardExemp: CardProduct;
	private filterCategory: FilterProduct;

	constructor(id: string) {
		super(id);
		this.cardExemp = new CardProduct(id);
		this.filterCategory = new FilterProduct('categoty__input');
	}

	createCardsOfProducts(arrFiltredProducts: filtredData, containerForCards = <HTMLElement>this.container.querySelector('.main__products')): void {
		const countOfProducts = <HTMLElement>this.container.querySelector('.count-of-products');
		countOfProducts.innerHTML = `Find: ${arrFiltredProducts.length}`;
		for (const product of arrFiltredProducts) {
			this.cardExemp = new CardProduct(`${product.id}`);
			const card = <HTMLElement>this.cardExemp.createCard(product.images[product.images.length - 1], product.title, product.category, product.brand, product.price, product.discountPercentage, product.rating, product.stock);
			containerForCards.append(card);
		}
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

	setFilters(filterValue: string, filters: string[]) {
		filters.push(filterValue);
	}

	deleteFilter(filterValue: string, filters: string[]) {
		const index = filters.indexOf(filterValue, 0);
		if (index !== -1) {
			filters.splice(index, 1);

		}
		else {
			console.log('elememt not find');
		}
	}

	getNewData() {
		let filtredData = this.data.products.filter(el => this.filteraArrCategory.length === 0 || this.filteraArrCategory.includes(el.category));
		filtredData = filtredData.filter(el => this.filteraArrBrand.length === 0 || this.filteraArrBrand.includes(el.brand));
		filtredData = filtredData.filter(el => el.stock >= this.stockRange[0] && el.stock <= this.stockRange[1]);
		filtredData = filtredData.filter(el => el.price >= this.priceRange[0] && el.price <= this.priceRange[1]);
		return filtredData;
	}

	functionalRangesPrice(containerInputsClassName: string, containerSpansClassName: string, containerInputsTrackClassName: string) {

		let containerInputs = <HTMLElement>this.container.querySelector(containerInputsClassName);
		let inputs = containerInputs.getElementsByTagName('input');
		let inputOne = inputs[0];
		let inputTwo = inputs[1];

		let containerSpans = <HTMLElement>this.container.querySelector(containerSpansClassName);
		const spans = containerSpans.getElementsByTagName('span');
		let spanValOne = spans[0];
		let spanValTwo = spans[2];

		let containerTrack = <HTMLElement>this.container.querySelector(containerInputsTrackClassName);
		let inputTrack = containerTrack.getElementsByTagName('div');
		let sliderTrack = inputTrack[0]
		let sliderMaxValue = inputOne.max;
		let minGap = 0;
		const containerForCards = <HTMLElement>this.container.querySelector('.main__products')

		inputOne.addEventListener('input', () => {
			if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
				inputOne.value = `${parseInt(inputTwo.value) - minGap}`
			}
			spanValOne.textContent = inputOne.value;
			fillcolor();
			this.priceRange[0] = parseInt(spanValOne.textContent);
			containerForCards.innerHTML = "";
			const filtredData = this.getNewData();
			if (filtredData)
				this.createCardsOfProducts(filtredData);
		});

		inputTwo.addEventListener('input', () => {
			if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
				inputTwo.value = `${parseInt(inputOne.value) + minGap}`;
			}
			spanValTwo.textContent = inputTwo.value;
			fillcolor();
			this.priceRange[1] = parseInt(spanValTwo.textContent);
			containerForCards.innerHTML = "";
			const filtredData = this.getNewData();
			console.log("PRICERANGE", this.priceRange);
			console.log("filtredData", filtredData);
			if (filtredData)
				this.createCardsOfProducts(filtredData);

		});
		function fillcolor() {
			let percent1 = (parseInt(inputOne.value) / parseInt(sliderMaxValue)) * 100;
			let percent2 = (parseInt(inputTwo.value) / parseInt(sliderMaxValue)) * 100;
			sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% ,
				#151516 ${percent1}% , #151516 ${percent2}% , #dadae5 ${percent2}%)`;
		}
	}

	functionalRangesStock(containerInputsClassName: string, containerSpansClassName: string, containerInputsTrackClassName: string) {

		let containerInputs = <HTMLElement>this.container.querySelector(containerInputsClassName);
		let inputs = containerInputs.getElementsByTagName('input');
		let inputOne = inputs[0];
		let inputTwo = inputs[1];

		let containerSpans = <HTMLElement>this.container.querySelector(containerSpansClassName);
		const spans = containerSpans.getElementsByTagName('span');
		let spanValOne = spans[0];
		let spanValTwo = spans[2];

		let containerTrack = <HTMLElement>this.container.querySelector(containerInputsTrackClassName);
		let inputTrack = containerTrack.getElementsByTagName('div');
		let sliderTrack = inputTrack[0]
		let sliderMaxValue = inputOne.max;
		let minGap = 0;
		const containerForCards = <HTMLElement>this.container.querySelector('.main__products')

		inputOne.addEventListener('input', () => {
			if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
				inputOne.value = `${parseInt(inputTwo.value) - minGap}`
			}
			spanValOne.textContent = inputOne.value;
			fillcolor();
			this.stockRange[0] = parseInt(spanValOne.textContent);
			containerForCards.innerHTML = "";
			const filtredData = this.getNewData();
			if (filtredData)
				this.createCardsOfProducts(filtredData);
		});

		inputTwo.addEventListener('input', () => {
			if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
				inputTwo.value = `${parseInt(inputOne.value) + minGap}`;
			}
			spanValTwo.textContent = inputTwo.value;
			fillcolor();
			this.stockRange[1] = parseInt(spanValTwo.textContent);
			containerForCards.innerHTML = "";
			const filtredData = this.getNewData();
			if (filtredData)
				this.createCardsOfProducts(filtredData);
		});

		function fillcolor() {
			let percent1 = (parseInt(inputOne.value) / parseInt(sliderMaxValue)) * 100;
			let percent2 = (parseInt(inputTwo.value) / parseInt(sliderMaxValue)) * 100;
			sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% ,
				#151516 ${percent1}% , #151516 ${percent2}% , #dadae5 ${percent2}%)`;
		}
	}

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
				  <div class="sort-search">
					  <div class="reset-total">
						  <button class="reset-total__clear-filters">Reset filters</button>
						  <button class="reset-total__copy-link">Copy link</button>
					  </div>
					  <div class="sort-of-products">
						  <label for="sort-of-products">Sort options:</label>
						  <select name="products" id="sort-of-products" class="sort-of-products-select">
						    <option value="">--Sort options:--</option>
							  <option value="price-ASC">Sort by price ASC</option>
							  <option value="price-DESC">Sort by price DESC</option>
							  <option value="rating-ASC">Sort by rating ASC</option>
							  <option value="rating-DESC">Sort by rating DESC</option>
						  </select>
					  </div>
					  <div class="count-of-products"></div>
					  <div class="search">
						  <input type="search" class="search-of-products" placeholder="Search product">
					  </div>
				  </div>
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
								<div class="price">
									<div class="values_price">
										<span class="range-1">10</span>
										<span>&ndash;</span>
										<span class="range-2">1749</span>
									</div>
									<div class="price__range">
										<div class="slider-track"></div>
										<input type="range" class="slider-1" value="0" min="10" max="1749">
										<input type="range" class="slider-2" value="1749" min="10" max="1749">
									</div>
							</div>
							</div>
							<div class="filters__stock">
								<h3 class="filters__header">AVAILABLE IN STOCK</h3>
								<div class="stock">
									<div class="values_stock">
										<span class="range-1">2</span>
										<span>&ndash;</span>
										<span class="range-2">150</span>
									</div>
									<div class="stock__range">
										<div class="slider-track"></div>
										<input type="range" class="slider-1" value="0" min="2" max="150">
										<input type="range" class="slider-2" value="150" min="2" max="150">
									</div>
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

		const containerForCards = <HTMLElement>this.container.querySelector('.main__products');
		this.createCardsOfProducts(this.data.products, containerForCards);

		//________________________Add filter by category and brand

		const containerFilterCategory = <HTMLElement>this.container.querySelector('.filters__category');
		const containerFilterBrand = <HTMLElement>this.container.querySelector('.filters__brand');

		const allCategories: string[] = this.data.products.map((elem: { category: string, }) => elem.category);
		const allBrands: string[] = this.data.products.map((elem: { brand: string, }) => elem.brand);

		const objCategory: { [key: string]: number } = this.getAmountOfProducts(allCategories);
		const objBrand: { [key: string]: number } = this.getAmountOfProducts(allBrands);

		this.createFilters(objCategory, containerFilterCategory, 'category__input');
		this.createFilters(objBrand, containerFilterBrand, 'brand__input');

		//__________________________Adding filtering functionality (by category and brand)

		const filterCategory = this.container.getElementsByClassName('category__input');
		const filterBrand = this.container.getElementsByClassName('brand__input');

		for (const el of filterCategory) {
			el.addEventListener('click', async () => {
				if ((<HTMLInputElement>el).checked === false) {
					containerForCards.innerHTML = '';
					this.deleteFilter((<HTMLInputElement>el).value, this.filteraArrCategory);
					const filtredData = this.getNewData();
					if (filtredData) {
						this.createCardsOfProducts(filtredData);
					}
				}

				if ((<HTMLInputElement>el).checked === true) {
					containerForCards.innerHTML = '';
					this.setFilters((<HTMLInputElement>el).value, this.filteraArrCategory);
					const filtredData = this.getNewData();
					if (filtredData) {
						this.createCardsOfProducts(filtredData, containerForCards);

					}
				}
				if (this.filteraArrCategory.length === 0 && this.filteraArrBrand.length === 0) {
					this.createCardsOfProducts(this.data.products);
				}
			})
		}

		for (const el of filterBrand) {
			el.addEventListener('click', async () => {
				if ((<HTMLInputElement>el).checked === false) {
					containerForCards.innerHTML = '';
					this.deleteFilter((<HTMLInputElement>el).value, this.filteraArrBrand);
					const filtredData = this.getNewData();
					if (filtredData) {
						this.createCardsOfProducts(filtredData);
					}

				}
				if ((<HTMLInputElement>el).checked === true) {
					containerForCards.innerHTML = '';
					this.setFilters((<HTMLInputElement>el).value, this.filteraArrBrand);
					const filtredData = this.getNewData();
					if (filtredData) {
						this.createCardsOfProducts(filtredData);
					}
				}
				if (this.filteraArrBrand.length === 0 && this.filteraArrCategory.length === 0) {
					this.createCardsOfProducts(this.data.products, containerForCards);
				}
			})
		}

		//_________________________Adding filtering functionality (by price and stock)
		const priceArray = this.data.products.map((el) => el.price).sort((a, b) => a - b);
		console.log(priceArray);
		const stockArray = this.data.products.map((el) => el.stock).sort((a, b) => a - b);
		console.log(stockArray);

		this.functionalRangesPrice('.price__range', '.values_price', '.price__range');
		this.functionalRangesStock('.stock__range', '.values_stock', '.stock__range');

		//_______________________Adding filtering functionality (by sort and search)

		let options = <HTMLElement>this.container.querySelector('.sort-of-products-select');
		options.addEventListener('change', (event) => {
			const selectedValue = (<HTMLInputElement>event.target).value;
			if (selectedValue === "price-ASC") {
				const filtredData = this.getNewData();
				if (filtredData) {
					containerForCards.innerHTML = ""
					this.createCardsOfProducts(filtredData.sort((a, b) => a.price - b.price));
				}
			}
			if (selectedValue === "price-DESC") {
				const filtredData = this.getNewData();
				if (filtredData) {
					containerForCards.innerHTML = ""
					this.createCardsOfProducts(filtredData.sort((a, b) => b.price - a.price));
				}
			}
			if (selectedValue === "rating-ASC") {
				const filtredData = this.getNewData();
				if (filtredData) {
					containerForCards.innerHTML = ""
					this.createCardsOfProducts(filtredData.sort((a, b) => a.rating - b.rating));
				}
			}
			if (selectedValue === "rating-DESC") {
				const filtredData = this.getNewData();
				if (filtredData) {
					containerForCards.innerHTML = ""
					this.createCardsOfProducts(filtredData.sort((a, b) => b.rating - a.rating));
				}
			}
		})




		return this.container;
	}
}
export default CatalogPage;
