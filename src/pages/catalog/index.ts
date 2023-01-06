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
    thumbnail: string;
    title: string;
}[];

class CatalogPage extends Page {
    static TextObject = {
        MainTitle: 'Catalog Page',
    };
    data = data;
    filteraArrCategory: string[] = [];
    filteraArrBrand: string[] = [];
    filterArrSearch: filtredData = [];
    priceRange: [number, number] = [
        this.data.products.map((el) => el.price).sort((a, b) => a - b)[0],
        this.data.products.map((el) => el.price).sort((a, b) => b - a)[0],
    ];
    stockRange: [number, number] = [
        this.data.products.map((el) => el.stock).sort((a, b) => a - b)[0],
        this.data.products.map((el) => el.stock).sort((a, b) => b - a)[0],
    ];
    private cardExemp: CardProduct;
    private filterCategory: FilterProduct;

    constructor(id: string) {
        super(id);
        this.cardExemp = new CardProduct(id);
        this.filterCategory = new FilterProduct('categoty__input');
    }

    createCardsOfProducts(
        arrFiltredProducts: filtredData,
        containerForCards = <HTMLElement>this.container.querySelector('.main__products')
    ): void {
        const countOfProducts = <HTMLElement>this.container.querySelector('.count-of-products');
        countOfProducts.innerHTML = `Find: ${arrFiltredProducts.length}`;
        if (arrFiltredProducts.length === 0) {
            containerForCards.innerHTML = 'Nothing found &#129488;';
            containerForCards.classList.add('main__products_empty');
        }
        for (const product of arrFiltredProducts) {
            this.cardExemp = new CardProduct(`${product.id}`);
            const card = <HTMLElement>(
                this.cardExemp.createCard(
                    product.images[product.images.length - 1],
                    product.title,
                    product.category,
                    product.brand,
                    product.price,
                    product.discountPercentage,
                    product.rating,
                    product.stock
                )
            );
            containerForCards.append(card);
        }
    }

    getAmountOfProducts(arr: string[]): { [key: string]: number } {
        let result: { [key: string]: number } = {};
        for (let i = 0; i < arr.length; ++i) {
            let a = arr[i];
            if (result[a] != undefined) {
                ++result[a];
            } else {
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

    setFilters(filterValue: string, filters: string[]): void {
        filters.push(filterValue);
    }

    deleteFilter(filterValue: string, filters: string[]): void {
        const index: number = filters.indexOf(filterValue, 0);
        if (index !== -1) {
            filters.splice(index, 1);
        } else {
            console.log('elememt not find');
        }
    }

    getNewData(): filtredData {
        if (this.filterArrSearch.length === 0) {
            let filtredData: filtredData = this.data.products.filter(
                (el) => this.filteraArrCategory.length === 0 || this.filteraArrCategory.includes(el.category)
            );
            filtredData = filtredData.filter(
                (el) => this.filteraArrBrand.length === 0 || this.filteraArrBrand.includes(el.brand)
            );
            filtredData = filtredData.filter((el) => el.stock >= this.stockRange[0] && el.stock <= this.stockRange[1]);
            filtredData = filtredData.filter((el) => el.price >= this.priceRange[0] && el.price <= this.priceRange[1]);
            return filtredData;
        } else {
            let filtredData: filtredData = this.filterArrSearch.filter(
                (el) => this.filteraArrCategory.length === 0 || this.filteraArrCategory.includes(el.category)
            );
            filtredData = filtredData.filter(
                (el) => this.filteraArrBrand.length === 0 || this.filteraArrBrand.includes(el.brand)
            );
            filtredData = filtredData.filter((el) => el.stock >= this.stockRange[0] && el.stock <= this.stockRange[1]);
            filtredData = filtredData.filter((el) => el.price >= this.priceRange[0] && el.price <= this.priceRange[1]);
            return filtredData;
        }
    }

    fillcolorInputTrack(
        containerInputsTrackClassName: string,
        inputOne: HTMLInputElement,
        inputTwo: HTMLInputElement
    ): void {
        const containerTrack = <HTMLElement>this.container.querySelector(containerInputsTrackClassName);
        const inputTrack = <HTMLCollectionOf<HTMLDivElement>>containerTrack.getElementsByTagName('div');
        const sliderTrack: HTMLDivElement = inputTrack[0];
        let sliderMaxValue: string = inputOne.max;
        let percent1: number = (parseInt(inputOne.value) / parseInt(sliderMaxValue)) * 100;
        let percent2: number = (parseInt(inputTwo.value) / parseInt(sliderMaxValue)) * 100;
        sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% ,
			#151516 ${percent1}% , #151516 ${percent2}% , #dadae5 ${percent2}%)`;
    }

    functionalRangesPrice(
        containerInputsTrackClassName: string,
        inputOne: HTMLInputElement,
        inputTwo: HTMLInputElement,
        min: HTMLSpanElement,
        max: HTMLSpanElement
    ): void {
        const minGap: number = 0;
        const containerForCards = <HTMLElement>this.container.querySelector('.main__products');

        inputOne.addEventListener('input', () => {
            if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
                inputOne.value = `${parseInt(inputTwo.value) - minGap}`;
            }
            min.textContent = inputOne.value;
            this.fillcolorInputTrack(containerInputsTrackClassName, inputOne, inputTwo);
            this.priceRange[0] = parseInt(min.textContent);
            containerForCards.innerHTML = '';
            const filtredData = this.getNewData();
            if (filtredData) this.createCardsOfProducts(filtredData);
        });

        inputTwo.addEventListener('input', () => {
            if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
                inputTwo.value = `${parseInt(inputOne.value) + minGap}`;
            }
            max.textContent = inputTwo.value;
            this.fillcolorInputTrack(containerInputsTrackClassName, inputOne, inputTwo);
            this.priceRange[1] = parseInt(max.textContent);
            containerForCards.innerHTML = '';
            const filtredData = this.getNewData();
            if (filtredData) this.createCardsOfProducts(filtredData);
        });
    }

    functionalRangesStock(
        containerInputsTrackClassName: string,
        inputOne: HTMLInputElement,
        inputTwo: HTMLInputElement,
        min: HTMLSpanElement,
        max: HTMLSpanElement
    ): void {
        const minGap = 0;
        const containerForCards = <HTMLElement>this.container.querySelector('.main__products');

        inputOne.addEventListener('input', () => {
            if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
                inputOne.value = `${parseInt(inputTwo.value) - minGap}`;
            }
            min.textContent = inputOne.value;
            this.fillcolorInputTrack(containerInputsTrackClassName, inputOne, inputTwo);
            this.stockRange[0] = parseInt(min.textContent);
            containerForCards.innerHTML = '';
            const filtredData = this.getNewData();
            if (filtredData) this.createCardsOfProducts(filtredData);
        });

        inputTwo.addEventListener('input', () => {
            if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
                inputTwo.value = `${parseInt(inputOne.value) + minGap}`;
            }
            max.textContent = inputTwo.value;
            this.fillcolorInputTrack(containerInputsTrackClassName, inputOne, inputTwo);
            this.stockRange[1] = parseInt(max.textContent);
            containerForCards.innerHTML = '';
            const filtredData = this.getNewData();
            if (filtredData) this.createCardsOfProducts(filtredData);
        });
    }

    searchProduct(arr: filtredData, val: string): filtredData {
        return arr.filter(
            (el) =>
                el.title.toLowerCase().includes(val.toLowerCase()) ||
                el.brand.toLowerCase().includes(val.toLowerCase()) ||
                el.category.toLowerCase().includes(val.toLowerCase()) ||
                el.description.toLowerCase().includes(val) ||
                el.discountPercentage.toString().includes(val) ||
                el.id.toString().includes(val) ||
                el.price.toString().includes(val.toLowerCase()) ||
                el.rating.toString().includes(val.toLowerCase())
        );
    }

    toggleClasses() {
        const cardsOfProducts: HTMLCollectionOf<Element> = this.container.getElementsByClassName('card');
        const titleOfCards = this.container.getElementsByClassName('card__title');
        const descriptionOfCards = this.container.getElementsByClassName('card__text');
        const buttonnsOfCards = this.container.getElementsByClassName('container__button');
        const imagesOfCards = this.container.getElementsByClassName('cardImg');
        const fewProducts = <HTMLButtonElement>this.container.querySelector('.few-products')
        const manyProducts = <HTMLButtonElement>this.container.querySelector('.many-products');

        // manyProducts.classList.toggle('active');
        // fewProducts.classList.toggle('inactive');

        for (const card of cardsOfProducts) {
            card.classList.toggle('card-many-cards');
        }
        for (const title of titleOfCards) {
            title.classList.toggle('card-title-many-cards')
        }
        for (const text of descriptionOfCards) {
            text.classList.toggle('absence')
        }
        for (const buttons of buttonnsOfCards) {
            buttons.classList.toggle('buttons-many-cards')
        }
        for (const image of imagesOfCards) {
            image.classList.toggle('cardImg-many-cards')
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
                        <div class="display-products">
                            <button class="many-products"></button>
                            <button class="few-products active"></button>
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

		</main>`;
        this.container.innerHTML = layoutCatalog;

        //_________________________Add cards of products to div main__products

        const containerForCards = <HTMLElement>this.container.querySelector('.main__products');
        this.createCardsOfProducts(this.data.products, containerForCards);

        //____________________________Switching the display of products

        const fewProducts = <HTMLButtonElement>this.container.querySelector('.few-products');
        const manyProducts = <HTMLButtonElement>this.container.querySelector('.many-products');

        manyProducts.addEventListener('click', () => {
            this.toggleClasses();
            manyProducts.classList.toggle('active');
            fewProducts.classList.toggle('active');
        })

        fewProducts.addEventListener('click', () => {
            this.toggleClasses();
            manyProducts.classList.toggle('active');
            fewProducts.classList.toggle('active');
        })

        //________________________Add filters by category and brand in layout

        const containerFilterCategory = <HTMLElement>this.container.querySelector('.filters__category');
        const containerFilterBrand = <HTMLElement>this.container.querySelector('.filters__brand');

        const allCategories: string[] = this.data.products.map((elem: { category: string }) => elem.category);
        const allBrands: string[] = this.data.products.map((elem: { brand: string }) => elem.brand);

        const objCategory: { [key: string]: number } = this.getAmountOfProducts(allCategories);
        const objBrand: { [key: string]: number } = this.getAmountOfProducts(allBrands);

        this.createFilters(objCategory, containerFilterCategory, 'category__input');
        this.createFilters(objBrand, containerFilterBrand, 'brand__input');

        //__________________________Adding filtering functionality (by category and brand)

        const filterCategory: HTMLCollectionOf<Element> = this.container.getElementsByClassName('category__input');
        const filterBrand: HTMLCollectionOf<Element> = this.container.getElementsByClassName('brand__input');

        for (const el of filterCategory) {
            el.addEventListener('click', async () => {
                if ((<HTMLInputElement>el).checked === false) {
                    containerForCards.innerHTML = '';
                    this.deleteFilter((<HTMLInputElement>el).value, this.filteraArrCategory);
                    const filtredData: filtredData = this.getNewData();
                    this.createCardsOfProducts(filtredData);
                    if (manyProducts.className === 'many-products active') {
                        this.toggleClasses();
                    }
                }
                if ((<HTMLInputElement>el).checked === true) {
                    containerForCards.innerHTML = '';
                    this.setFilters((<HTMLInputElement>el).value, this.filteraArrCategory);
                    const filtredData: filtredData = this.getNewData();
                    this.createCardsOfProducts(filtredData, containerForCards);
                    if (manyProducts.className === 'many-products active') {
                        this.toggleClasses();
                    }
                }
                if (
                    this.filteraArrCategory.length === 0 &&
                    this.filteraArrBrand.length === 0 &&
                    this.filterArrSearch.length === 0
                ) {
                    this.createCardsOfProducts(this.data.products);
                }
            });
        }

        for (const el of filterBrand) {
            el.addEventListener('click', async () => {
                if ((<HTMLInputElement>el).checked === false) {
                    containerForCards.innerHTML = '';
                    this.deleteFilter((<HTMLInputElement>el).value, this.filteraArrBrand);
                    const filtredData: filtredData = this.getNewData();
                    this.createCardsOfProducts(filtredData);
                    if (manyProducts.className === 'many-products active') {
                        this.toggleClasses();
                    }
                }
                if ((<HTMLInputElement>el).checked === true) {
                    containerForCards.innerHTML = '';
                    this.setFilters((<HTMLInputElement>el).value, this.filteraArrBrand);
                    const filtredData: filtredData = this.getNewData();
                    this.createCardsOfProducts(filtredData);
                    if (manyProducts.className === 'many-products active') {
                        this.toggleClasses();
                    }
                }
                if (
                    this.filteraArrBrand.length === 0 &&
                    this.filteraArrCategory.length === 0 &&
                    this.filterArrSearch.length === 0
                ) {
                    this.createCardsOfProducts(this.data.products, containerForCards);
                }
            });
        }

        //_________________________Adding filtering functionality by price

        const containerInputsPrice = <HTMLElement>this.container.querySelector('.price__range');
        const inputsPrice: HTMLCollectionOf<HTMLInputElement> = containerInputsPrice.getElementsByTagName('input');
        const inputPriceOne: HTMLInputElement = inputsPrice[0];
        const inputPriceTwo: HTMLInputElement = inputsPrice[1];

        const containerSpansPrice = <HTMLElement>this.container.querySelector('.values_price');
        const minMaxPrice: HTMLCollectionOf<HTMLSpanElement> = containerSpansPrice.getElementsByTagName('span');
        const minPrice: HTMLSpanElement = minMaxPrice[0];
        const maxPrice: HTMLSpanElement = minMaxPrice[2];

        this.functionalRangesPrice('.price__range', inputPriceOne, inputPriceTwo, minPrice, maxPrice);

        //_________________________Adding filtering functionality by stock

        const containerInputsStock = <HTMLElement>this.container.querySelector('.stock__range');
        const inputsStock: HTMLCollectionOf<HTMLInputElement> = containerInputsStock.getElementsByTagName('input');
        const inputStockOne: HTMLInputElement = inputsStock[0];
        const inputStockTwo: HTMLInputElement = inputsStock[1];

        const containerSpansStock = <HTMLElement>this.container.querySelector('.values_stock');
        const minMaxStock: HTMLCollectionOf<HTMLSpanElement> = containerSpansStock.getElementsByTagName('span');
        const minStock: HTMLSpanElement = minMaxStock[0];
        const maxStock: HTMLSpanElement = minMaxStock[2];

        this.functionalRangesStock('.stock__range', inputStockOne, inputStockTwo, minStock, maxStock);

        //_______________________Adding filtering functionality by sort

        const options = <HTMLElement>this.container.querySelector('.sort-of-products-select');
        options.addEventListener('change', (event) => {
            const selectedValue: string = (<HTMLInputElement>event.target).value;

            if (selectedValue === 'price-ASC') {
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = '';
                this.createCardsOfProducts(filtredData.sort((a, b) => a.price - b.price));
            }
            if (selectedValue === 'price-DESC') {
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = '';
                this.createCardsOfProducts(filtredData.sort((a, b) => b.price - a.price));
            }
            if (selectedValue === 'rating-ASC') {
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = '';
                this.createCardsOfProducts(filtredData.sort((a, b) => a.rating - b.rating));
            }
            if (selectedValue === 'rating-DESC') {
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = '';
                this.createCardsOfProducts(filtredData.sort((a, b) => b.rating - a.rating));
            }
        });

        //_______________________Adding filtering functionality by search

        const inputSearch = <HTMLInputElement>this.container.querySelector('.search-of-products');

        inputSearch.addEventListener('input', () => {
            let val: string = inputSearch.value.trim();
            if (val !== '') {
                this.filterArrSearch = this.searchProduct(this.data.products, val);
                const filtredData: filtredData = this.getNewData();
                const searchedArrData: filtredData = this.searchProduct(filtredData, val);
                containerForCards.innerHTML = '';
                this.createCardsOfProducts(searchedArrData);
            } else {
                this.filterArrSearch = [];
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = '';
                this.createCardsOfProducts(filtredData);
            }
        });

        //_______________________________________Reset Filters

        const resetFilters = <HTMLElement>this.container.querySelector('.reset-total__clear-filters');
        resetFilters.addEventListener('click', () => {
            for (const el of filterCategory) {
                (<HTMLInputElement>el).checked = false;
            }
            for (const el of filterBrand) {
                (<HTMLInputElement>el).checked = false;
            }
            inputPriceOne.value = '10';
            inputPriceTwo.value = '1749';
            minPrice.innerText = inputPriceOne.value;
            maxPrice.innerText = inputPriceTwo.value;
            this.fillcolorInputTrack('.price__range', inputPriceOne, inputPriceTwo);

            inputStockOne.value = '2';
            inputStockTwo.value = '150';
            minStock.innerText = inputStockOne.value;
            maxStock.innerText = inputStockTwo.value;
            this.fillcolorInputTrack('.stock__range', inputStockOne, inputStockTwo);

            inputSearch.value = '';

            this.filteraArrCategory = [];
            this.filteraArrBrand = [];
            this.filterArrSearch = [];
            this.priceRange = [
                this.data.products.map((el) => el.price).sort((a, b) => a - b)[0],
                this.data.products.map((el) => el.price).sort((a, b) => b - a)[0],
            ];
            this.stockRange = [
                this.data.products.map((el) => el.stock).sort((a, b) => a - b)[0],
                this.data.products.map((el) => el.stock).sort((a, b) => b - a)[0],
            ];
            containerForCards.innerHTML = '';
            this.createCardsOfProducts(this.data.products);
        });
        return this.container;
    }
}
export default CatalogPage;
