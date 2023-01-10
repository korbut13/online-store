import Page from '../../core/templates/page';
import './style.css';
import { DataObject, data } from '../../core/components/data/getsData';
import { IProduct } from '../../core/components/data/getsData';
import CardProduct from '../../core/templates/cardProducts';
import FilterProduct from '../../core/templates/filtersProducts';
import App from '../app';


class CatalogPage extends Page {
    static TextObject = {
        MainTitle: 'Catalog Page',
    };
    private data: DataObject = data;
    private filteraArrCategory: string[];
    private filteraArrBrand: string[];
    private filterArrSearch: IProduct[];
    private valueSearch: string;
    private priceRange: [number, number];
    private stockRange: [number, number];
    private cardExemp: CardProduct;
    private filterCategory: FilterProduct;

    constructor(id: string) {
        super(id);
        this.cardExemp = new CardProduct(id);
        this.priceRange = [this.data.products.map((el) => el.price).sort((a, b) => a - b)[0], this.data.products.map((el) => el.price).sort((a, b) => b - a)[0]];
        this.stockRange = [this.data.products.map((el) => el.stock).sort((a, b) => a - b)[0], this.data.products.map((el) => el.stock).sort((a, b) => b - a)[0]];
        this.filteraArrCategory = [];
        this.filteraArrBrand = [];
        this.filterArrSearch = [];
        this.valueSearch = '';

        const splittedHash: string[] = window.location.hash.slice(1).split('?');
        let filters: string = splittedHash[1];
        if (filters) {
            const splitted: string[] = filters.split('&');
            splitted.forEach(el => {
                const splittedFilter: string[] = el.split('=');
                const filterName: string = splittedFilter[0];
                const filterValues: string[] = splittedFilter[1].split(',');
                if (filterName === 'category') {
                    this.filteraArrCategory = filterValues;
                }
                if (filterName === 'brand') {
                    this.filteraArrBrand = filterValues;
                }
                if (filterName === 'price') {
                    this.priceRange = [+filterValues[0], +filterValues[1]];
                }
                if (filterName === 'stock') {
                    this.stockRange = [+filterValues[0], +filterValues[1]];
                }
                if (filterName === 'search') {
                    this.valueSearch = filterValues.join('');
                }
            });
        }

        this.filterCategory = new FilterProduct('categoty__input', 'span__input');

    }

    createCardsOfProducts(arrFiltredProducts: IProduct[], containerForCards = <HTMLElement>this.container.querySelector('.main__products')): void {
        const countOfProducts = <HTMLElement>this.container.querySelector('.count-of-products');
        console.log(countOfProducts)
        countOfProducts.innerHTML = `Find: ${arrFiltredProducts.length}`;
        if (arrFiltredProducts.length === 0) {
            containerForCards.innerHTML = "Nothing found &#129488;"
            containerForCards.classList.add('main__products_empty')
        }
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

    createFilters(obj: { [key: string]: number }, renderContainer: HTMLElement, inputNameClass: string): void {
        Object.entries(obj).forEach(([key, value]) => {
            const spanClassName = key.replace(/ /g, '');
            const checked = this.filteraArrCategory.includes(key) || this.filteraArrBrand.includes(key);

            this.filterCategory = new FilterProduct(inputNameClass, spanClassName);
            const divCategory = this.filterCategory.renderCheckbox(key, value, checked);
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
        }
        else {
            console.log('elememt not find');
        }
    }

    getNewData(): IProduct[] {
        if (this.filterArrSearch.length === 0) {
            let filtredData: IProduct[] = this.data.products.filter(el => this.filteraArrCategory.length === 0 || this.filteraArrCategory.includes(el.category));
            filtredData = filtredData.filter(el => this.filteraArrBrand.length === 0 || this.filteraArrBrand.includes(el.brand));
            filtredData = filtredData.filter(el => el.stock >= this.stockRange[0] && el.stock <= this.stockRange[1]);
            filtredData = filtredData.filter(el => el.price >= this.priceRange[0] && el.price <= this.priceRange[1]);
            return filtredData;
        }
        else {
            let filtredData: IProduct[] = this.filterArrSearch.filter(el => this.filteraArrCategory.length === 0 || this.filteraArrCategory.includes(el.category));
            filtredData = filtredData.filter(el => this.filteraArrBrand.length === 0 || this.filteraArrBrand.includes(el.brand));
            filtredData = filtredData.filter(el => el.stock >= this.stockRange[0] && el.stock <= this.stockRange[1]);
            filtredData = filtredData.filter(el => el.price >= this.priceRange[0] && el.price <= this.priceRange[1]);
            return filtredData;
        }
    }
    rangeComponent(rangeContainer: HTMLElement, min: number, max: number, onChange: (min: number, max: number) => void) {

        const inputs: HTMLCollectionOf<HTMLInputElement> = rangeContainer.getElementsByTagName('input');
        const inputMin: HTMLInputElement = inputs[0];
        const inputMax: HTMLInputElement = inputs[1];
        inputMin.value = `${min}`;
        inputMax.value = `${max}`;

        const minMaxValue: NodeListOf<HTMLParagraphElement> = rangeContainer.querySelectorAll('.range-values p');
        const minText: HTMLParagraphElement = minMaxValue[0];
        const maxText: HTMLParagraphElement = minMaxValue[2];

        const minGap: number = 0;

        let currentMin: number = min;
        let currentMax: number = max;

        inputMin.addEventListener('input', () => {
            currentMin = parseInt(inputMin.value);
            currentMax = parseInt(inputMax.value);
            if (currentMax - currentMin <= minGap) {
                currentMin = currentMax - minGap
                inputMin.value = `${currentMin}`;
            };
            minText.textContent = inputMin.value;
            onChange(currentMin, currentMax);

        });
        inputMax.addEventListener('input', () => {
            currentMin = parseInt(inputMin.value);
            currentMax = parseInt(inputMax.value);
            if (currentMax - currentMin <= minGap) {
                currentMax = currentMin + minGap
                inputMax.value = `${currentMax} `;
            };

            maxText.textContent = inputMax.value;
            onChange(currentMin, currentMax);
        });
    }

    searchProduct(arr: IProduct[], val: string): IProduct[] {
        return arr.filter((el) => el.title.toLowerCase().includes(val.toLowerCase()) || el.brand.toLowerCase().includes(val.toLowerCase()) || el.category.toLowerCase().includes(val.toLowerCase()) ||
            el.description.toLowerCase().includes(val) || el.discountPercentage.toString().includes(val) || el.price.toString().includes(val.toLowerCase()) || el.rating.toString().includes(val.toLowerCase()));
    }

    recalcFoundProducts(data: IProduct[], rangeContainerPrice: HTMLElement, rangeContainerStock: HTMLElement) {
        const containerAmountFindedFilters = <HTMLElement>this.container.querySelector('.filters')
        const amountBrandsAndCategory: HTMLCollectionOf<HTMLSpanElement> = containerAmountFindedFilters.getElementsByTagName('span');

        const inputsPrice: HTMLCollectionOf<HTMLInputElement> = rangeContainerPrice.getElementsByTagName('input');
        const inputMinPrice: HTMLInputElement = inputsPrice[0];
        const inputMaxPrice: HTMLInputElement = inputsPrice[1];

        const minMaxValuePrice: NodeListOf<HTMLParagraphElement> = rangeContainerPrice.querySelectorAll('.range-values p');
        const minPriceText: HTMLParagraphElement = minMaxValuePrice[0];
        const maxPriceText: HTMLParagraphElement = minMaxValuePrice[2];

        const inputsStock: HTMLCollectionOf<HTMLInputElement> = rangeContainerStock.getElementsByTagName('input');
        const inputMinStock: HTMLInputElement = inputsStock[0];
        const inputMaxStock: HTMLInputElement = inputsStock[1];

        const minMaxValueStock: NodeListOf<HTMLParagraphElement> = rangeContainerStock.querySelectorAll('.range-values p');
        const minStockText: HTMLParagraphElement = minMaxValueStock[0];
        const maxStockText: HTMLParagraphElement = minMaxValueStock[2];


        const minPriceValue: number = data.map((el) => el.price).sort((a, b) => a - b)[0];
        const maxPriceValue: number = data.map((el) => el.price).sort((a, b) => b - a)[0];
        const minStockValue: number = data.map((el) => el.stock).sort((a, b) => a - b)[0];
        const maxStockValue: number = data.map((el) => el.stock).sort((a, b) => b - a)[0];

        const brandsFinded: string[] = data.map((elem: { brand: string, }) => elem.brand.replace(/ /g, ''));
        const categoryFinded: string[] = data.map((el) => el.category);
        const categoryAndBrands: string[] = brandsFinded.concat(categoryFinded);
        const objBrandsCategoryFinded: { [key: string]: number } = this.getAmountOfProducts(categoryAndBrands);
        const arrBrandsCategoryFinded = Object.entries(objBrandsCategoryFinded).flat(Infinity);
        const arrStringsBrandsCategoryFinded = arrBrandsCategoryFinded.filter((el) => typeof el === "string");

        for (const amount of amountBrandsAndCategory) {
            if (arrStringsBrandsCategoryFinded.includes(amount.className)) {
                const index: number = arrBrandsCategoryFinded.indexOf(amount.className);
                amount.innerHTML = `${arrBrandsCategoryFinded[index + 1]}`;
            }
            else {
                amount.innerHTML = "0";
            }
        }

        inputMinPrice.value = `${minPriceValue}`;
        inputMaxPrice.value = `${maxPriceValue}`;
        minPriceText.textContent = inputMinPrice.value;
        maxPriceText.textContent = inputMaxPrice.value;
        this.priceRange[0] = minPriceValue;
        this.priceRange[1] = maxPriceValue;


        inputMinStock.value = `${minStockValue}`;
        inputMaxStock.value = `${maxStockValue}`;
        minStockText.textContent = inputMinStock.value;
        maxStockText.textContent = inputMaxStock.value;
        this.stockRange[0] = minStockValue;
        this.stockRange[1] = maxStockValue;
    }
    toggleClasses() {
        const cardsOfProducts: HTMLCollectionOf<Element> = this.container.getElementsByClassName('card');
        const titleOfCards = this.container.getElementsByClassName('card__title');
        const descriptionOfCards = this.container.getElementsByClassName('card__text');
        const buttonnsOfCards = this.container.getElementsByClassName('container__button');
        const imagesOfCards = this.container.getElementsByClassName('cardImg');
        const fewProducts = <HTMLButtonElement>this.container.querySelector('.few-products')
        const manyProducts = <HTMLButtonElement>this.container.querySelector('.many-products');

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

    createFilterString(): string {
        let filterValue: string = `price=${this.priceRange[0]},${this.priceRange[1]}&stock=${this.stockRange[0]},${this.stockRange[1]}&`;

        if (this.filteraArrCategory.length !== 0) {
            filterValue += `category=${this.filteraArrCategory}&`
        }
        if (this.filteraArrBrand.length !== 0) {
            filterValue += `brand=${this.filteraArrBrand}&`
        }
        if (this.valueSearch.length !== 0) {
            filterValue += `search=${this.valueSearch}&`;
        }
        return filterValue.slice(0, -1);
    }

    replaceFilterString(): void {

        const newFilterValue = this.createFilterString();
        const path = window.location.hash.slice(1).split('?')[0];
        const url = new URL(window.location.toString());
        url.hash = path + '?' + newFilterValue;
        window.history.pushState({}, '', url);
    }


    render(): HTMLElement {
        const layoutCatalog: string = `<main class="main">
    <article class="background">
        <div class="background__img_top" > </div>
            <div class="background__img_info">
                <p class="background__text" > WINTER 2023 </p>
                <button class="background__buttom" href="#catalog-page"> TO CATALOG </button>
            </div>
            <div class="background__img_left" > </div>
            <div class="background__img_right" > </div>
    </article>

    <p class="main__header" id="catalog" > CATALOG </p>

    <section class="products">
        <div class="container">
            <div class="sort-search">
                <div class="reset-total">
                    <button class="reset-total__clear-filters"> Reset filters </button>
                    <button class="reset-total__copy-link"> Copy link </button>
                </div>
                <div class="sort-of-products">
                    <label for= "sort-of-products" > Sort options: </label>
                    <select name = "products" id = "sort-of-products" class="sort-of-products-select">
                        <option value="" > --Sort options: --</option>
                            <option value = "price-ASC" > Sort by price ASC </option>
                            <option value = "price-DESC" > Sort by price DESC </option>
                            <option value = "rating-ASC" > Sort by rating ASC </option>
                            <option value = "rating-DESC" > Sort by rating DESC </option>
                    </select>
                </div>
                <div class="count-of-products" ></div>
                <div class="search">
                    <input type="search" class="search-of-products" placeholder = "Search product">
                </div>
                <div class="display-products">
                    <button class="many-products"></button>
                    <button class="few-products active"></button>
                </div>
            </div>
            <div class="products__wrapper">
                <div class="filters">
                    <div class="filters__category">
                        <h3 id="filters__category_header" class="filters__header" > CATEGORIES </h3>
                    </div>
                    <div class="filters__brand">
                        <h3 class="filters__header"> BRANDS </h3>
                    </div>
                    <div class="filters__price">
                        <h3 class="filters__header" > PRICE </h3>
                        <div class="price">
                            <div class="range-values">
                                <p class="range-1" > 10 </p>
                                <p class="dash">&ndash; </p>
                                <p class="range-2" > 1749 </p>
                            </div>
                            <div class="price__range">
                                <div class="slider-track"> </div>
                                <input type = "range" class="slider-1" value = "0" min = "10" max = "1749">
                                <input type="range" class="slider-2" value = "1749" min = "10" max = "1749">
                            </div>
                        </div>
                    </div>
                    <div class="filters__stock">
                        <h3 class="filters__header" > AVAILABLE IN STOCK </h3>
                        <div class="stock">
                            <div class="range-values">
                                <p class="range-1" > 2 </p>
                                <p class="dash">&ndash; </p>
                                <p class="range-2" > 150 </p>
                            </div>
                            <div class="stock__range">
                                <div class="slider-track"></div>
                                <input type = "range" class="slider-1" value = "0" min = "2" max = "150">
                                <input type="range" class="slider-2" value = "150" min = "2" max = "150">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main__products" > </div>
            </div>
        </div>
    </section>
</main>`
        this.container.innerHTML = layoutCatalog;
        //__________________________________________________________________________________________


        //_________________________Add cards of products to div main__products

        const containerForCards = <HTMLElement>this.container.querySelector('.main__products');
        this.createCardsOfProducts(this.getNewData(), containerForCards);
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

        const allCategories: string[] = this.data.products.map((elem: { category: string, }) => elem.category);
        const allBrands: string[] = this.data.products.map((elem: { brand: string, }) => elem.brand);

        const objCategory: { [key: string]: number } = this.getAmountOfProducts(allCategories);
        const objBrand: { [key: string]: number } = this.getAmountOfProducts(allBrands);


        this.createFilters(objCategory, containerFilterCategory, 'category__input');
        this.createFilters(objBrand, containerFilterBrand, 'brand__input');

        //__________________________Adding filtering functionality (by category and brand)

        const filterCategory: HTMLCollectionOf<Element> = this.container.getElementsByClassName('category__input');
        const filterBrand: HTMLCollectionOf<Element> = this.container.getElementsByClassName('brand__input');

        for (const el of filterCategory) {
            el.addEventListener('click', () => {
                const checked = (<HTMLInputElement>el).checked;
                if (!checked) {
                    this.deleteFilter((<HTMLInputElement>el).value, this.filteraArrCategory);

                } else {
                    this.setFilters((<HTMLInputElement>el).value, this.filteraArrCategory);
                }
                containerForCards.innerHTML = '';
                const filtredData: IProduct[] = this.getNewData();
                this.createCardsOfProducts(filtredData, containerForCards);
                this.recalcFoundProducts(this.getNewData(), containerInputsPrice, containerInputsStock);
                if (manyProducts.className === 'many-products active') {
                    this.toggleClasses();
                }
                this.replaceFilterString();
            })
        }

        for (const el of filterBrand) {
            el.addEventListener('click', async () => {
                const checked = (<HTMLInputElement>el).checked;
                if (!checked) {
                    this.deleteFilter((<HTMLInputElement>el).value, this.filteraArrBrand);
                }
                else {
                    this.setFilters((<HTMLInputElement>el).value, this.filteraArrBrand);
                }
                containerForCards.innerHTML = '';
                const filtredData: IProduct[] = this.getNewData();
                this.createCardsOfProducts(filtredData);
                this.recalcFoundProducts(this.getNewData(), containerInputsPrice, containerInputsStock);
                if (manyProducts.className === 'many-products active') {
                    this.toggleClasses();
                }
                this.replaceFilterString();
            })
        }




        //_________________________Adding filtering functionality by price

        const containerInputsPrice = <HTMLElement>this.container.querySelector('.price');
        const containerInputsStock = <HTMLElement>this.container.querySelector('.stock');

        this.rangeComponent(containerInputsPrice, this.priceRange[0], this.priceRange[1], (min, max) => {

            containerForCards.innerHTML = "";

            this.priceRange = [min, max];
            const filtredData = this.getNewData();
            this.createCardsOfProducts(filtredData);
            this.recalcFoundProducts(filtredData, containerInputsPrice, containerInputsStock);
            if (manyProducts.className === 'many-products active') {
                this.toggleClasses();
            }
            this.replaceFilterString()


        });
        this.rangeComponent(containerInputsStock, this.stockRange[0], this.priceRange[1], (min, max) => {
            containerForCards.innerHTML = "";
            this.stockRange = [min, max];
            const filtredData = this.getNewData();
            this.createCardsOfProducts(filtredData);
            this.recalcFoundProducts(filtredData, containerInputsPrice, containerInputsStock);
            if (manyProducts.className === 'many-products active') {
                this.toggleClasses();
            }
            this.replaceFilterString();
        })



        //_______________________Adding filtering functionality by sort

        const options = <HTMLElement>this.container.querySelector('.sort-of-products-select');
        options.addEventListener('change', (event) => {
            const selectedValue: string = (<HTMLInputElement>event.target).value;

            if (selectedValue === "price-ASC") {
                const filtredData: IProduct[] = this.getNewData();
                containerForCards.innerHTML = ""
                this.createCardsOfProducts(filtredData.sort((a, b) => a.price - b.price));
                if (manyProducts.className === 'many-products active') {
                    this.toggleClasses();
                }
            }
            if (selectedValue === "price-DESC") {
                const filtredData: IProduct[] = this.getNewData();
                containerForCards.innerHTML = ""
                this.createCardsOfProducts(filtredData.sort((a, b) => b.price - a.price));
                if (manyProducts.className === 'many-products active') {
                    this.toggleClasses();
                }
            }
            if (selectedValue === "rating-ASC") {
                const filtredData: IProduct[] = this.getNewData();
                containerForCards.innerHTML = ""
                this.createCardsOfProducts(filtredData.sort((a, b) => a.rating - b.rating));
                if (manyProducts.className === 'many-products active') {
                    this.toggleClasses();
                }
            }
            if (selectedValue === "rating-DESC") {
                const filtredData: IProduct[] = this.getNewData();
                containerForCards.innerHTML = ""
                this.createCardsOfProducts(filtredData.sort((a, b) => b.rating - a.rating));
                if (manyProducts.className === 'many-products active') {
                    this.toggleClasses();
                }
            }
        })

        //_______________________Adding filtering functionality by search

        const inputSearch = <HTMLInputElement>this.container.querySelector('.search-of-products');

        inputSearch.addEventListener('input', () => {

            this.valueSearch = inputSearch.value.trim();

            if (this.valueSearch !== "") {
                this.filterArrSearch = this.searchProduct(this.data.products, this.valueSearch);
                const filtredData: IProduct[] = this.getNewData();
                const searchedArrData: IProduct[] = this.searchProduct(filtredData, this.valueSearch)
                containerForCards.innerHTML = "";
                this.createCardsOfProducts(searchedArrData);
                this.recalcFoundProducts(filtredData, containerInputsPrice, containerInputsStock);
                if (manyProducts.className === 'many-products active') {
                    this.toggleClasses();
                }
                this.replaceFilterString();
            }
            else {
                this.filterArrSearch = [];
                const filtredData: IProduct[] = this.getNewData();
                containerForCards.innerHTML = "";
                this.createCardsOfProducts(filtredData);
                this.recalcFoundProducts(filtredData, containerInputsPrice, containerInputsStock);
                if (manyProducts.className === 'many-products active') {
                    this.toggleClasses();
                }
                this.replaceFilterString();
            }
        })


        //_______________________________________Reset Filters

        const resetFilters = <HTMLElement>this.container.querySelector('.reset-total__clear-filters');
        resetFilters.addEventListener('click', () => {
            for (const el of filterCategory) {
                (<HTMLInputElement>el).checked = false;
            }
            for (const el of filterBrand) {
                (<HTMLInputElement>el).checked = false;
            }
            inputSearch.value = "";
            this.priceRange = [this.data.products.map((el) => el.price).sort((a, b) => a - b)[0], this.data.products.map((el) => el.price).sort((a, b) => b - a)[0]];
            this.stockRange = [this.data.products.map((el) => el.stock).sort((a, b) => a - b)[0], this.data.products.map((el) => el.stock).sort((a, b) => b - a)[0]];
            this.filteraArrCategory = [];
            this.filteraArrBrand = [];
            this.filterArrSearch = [];
            containerForCards.innerHTML = "";
            this.createCardsOfProducts(this.data.products);
            this.recalcFoundProducts(this.data.products, containerInputsPrice, containerInputsStock);
            if (manyProducts.className === 'many-products active') {
                this.toggleClasses();
            }
            this.replaceFilterString();
            window.location.hash = 'catalog-page';
        });

        const copyLink = <HTMLButtonElement>this.container.querySelector('.reset-total__copy-link');
        copyLink.addEventListener('click', () => {
            const text = window.location.href;
            navigator.clipboard.writeText(text);

            copyLink.classList.add('copyLink');
            copyLink.innerText = "Copied";
            setTimeout(() => {
                copyLink.innerText = "Copy link";
                copyLink.classList.toggle('copyLink');
            }, 1000)
        })



        return this.container;
    }
}
export default CatalogPage;
