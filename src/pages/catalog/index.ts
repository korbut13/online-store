import Page from '../../core/templates/page';
import './style.css';
import { DataObject, data } from '../../core/components/data/getsData';
import { IProduct } from '../../core/components/data/getsData';
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
    priceRange: [number, number] = [this.data.products.map((el) => el.price).sort((a, b) => a - b)[0], this.data.products.map((el) => el.price).sort((a, b) => b - a)[0]];
    stockRange: [number, number] = [this.data.products.map((el) => el.stock).sort((a, b) => a - b)[0], this.data.products.map((el) => el.stock).sort((a, b) => b - a)[0]];
    private cardExemp: CardProduct;
    private filterCategory: FilterProduct;

    constructor(id: string) {
        super(id);
        this.cardExemp = new CardProduct(id);
        this.filterCategory = new FilterProduct('categoty__input', 'span__input');
    }

    createCardsOfProducts(arrFiltredProducts: filtredData, containerForCards = <HTMLElement>this.container.querySelector('.main__products')): void {
        const countOfProducts = <HTMLElement>this.container.querySelector('.count-of-products');
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
            const spanClassName = key.replace(/ /g, '')
            this.filterCategory = new FilterProduct(inputNameClass, spanClassName);
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

    functionalRangesPrice(inputOne: HTMLInputElement, inputTwo: HTMLInputElement, min: HTMLParagraphElement, max: HTMLParagraphElement, spansBrandsAndCategory: HTMLCollectionOf<HTMLSpanElement>, inputStockOne: HTMLInputElement, inputStockTwo: HTMLInputElement, minStock: HTMLParagraphElement, maxStock: HTMLParagraphElement): void {
        const minGap: number = 0;
        const containerForCards = <HTMLElement>this.container.querySelector('.main__products')

        inputOne.addEventListener('input', () => {
            if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
                inputOne.value = `${parseInt(inputTwo.value) - minGap}`
            }
            min.textContent = inputOne.value;
            this.priceRange[0] = parseInt(min.textContent);
            containerForCards.innerHTML = "";
            const filtredData = this.getNewData();
            if (filtredData)
                this.createCardsOfProducts(filtredData);
            this.countFoundProducts(filtredData, spansBrandsAndCategory, inputOne, inputTwo, min, max, inputStockOne, inputStockTwo, minStock, maxStock)
        });

        inputTwo.addEventListener('input', () => {
            if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
                inputTwo.value = `${parseInt(inputOne.value) + minGap}`;
            }
            max.textContent = inputTwo.value;
            this.priceRange[1] = parseInt(max.textContent);
            containerForCards.innerHTML = "";
            const filtredData = this.getNewData();
            if (filtredData)
                this.createCardsOfProducts(filtredData);
            this.countFoundProducts(filtredData, spansBrandsAndCategory, inputOne, inputTwo, min, max, inputStockOne, inputStockTwo, minStock, maxStock)
        });
    }

    functionalRangesStock(inputOne: HTMLInputElement, inputTwo: HTMLInputElement, min: HTMLParagraphElement, max: HTMLParagraphElement, spansBrandsAndCategory: HTMLCollectionOf<HTMLSpanElement>, inputPriceOne: HTMLInputElement, inputPriceTwo: HTMLInputElement, minPrice: HTMLParagraphElement, maxPrice: HTMLParagraphElement): void {

        const minGap = 0;
        const containerForCards = <HTMLElement>this.container.querySelector('.main__products')

        inputOne.addEventListener('input', () => {
            if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
                inputOne.value = `${parseInt(inputTwo.value) - minGap}`
            }
            min.textContent = inputOne.value;
            this.stockRange[0] = parseInt(min.textContent);
            containerForCards.innerHTML = "";
            const filtredData = this.getNewData();
            if (filtredData)
                this.createCardsOfProducts(filtredData);
            this.countFoundProducts(filtredData, spansBrandsAndCategory, inputPriceOne, inputPriceTwo, minPrice, maxPrice, inputOne, inputTwo, min, max);
        });

        inputTwo.addEventListener('input', () => {
            if (parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap) {
                inputTwo.value = `${parseInt(inputOne.value) + minGap}`;
            }
            max.textContent = inputTwo.value;
            this.stockRange[1] = parseInt(max.textContent);
            containerForCards.innerHTML = "";
            const filtredData = this.getNewData();
            if (filtredData)
                this.createCardsOfProducts(filtredData);
            this.countFoundProducts(filtredData, spansBrandsAndCategory, inputPriceOne, inputPriceTwo, minPrice, maxPrice, inputOne, inputTwo, min, max);
        });
    }

    searchProduct(arr: IProduct[], val: string): IProduct[] {
        return arr.filter((el) => el.title.toLowerCase().includes(val.toLowerCase()) || el.brand.toLowerCase().includes(val.toLowerCase()) || el.category.toLowerCase().includes(val.toLowerCase()) ||
            el.description.toLowerCase().includes(val) || el.discountPercentage.toString().includes(val) || el.id.toString().includes(val) ||
            el.price.toString().includes(val.toLowerCase()) || el.rating.toString().includes(val.toLowerCase()));
    }

    countFoundProducts(data: filtredData, spansBrandsAndCategory: HTMLCollectionOf<HTMLSpanElement>, inpPriceOne: HTMLInputElement, inpPriceTwo: HTMLInputElement, minPrice: HTMLParagraphElement, maxPrice: HTMLParagraphElement, inpStockOne: HTMLInputElement, inpStockTwo: HTMLInputElement, minStock: HTMLParagraphElement, maxStock: HTMLParagraphElement) {
        const minPriceValue = data.map((el) => el.price).sort((a, b) => a - b)[0];
        const maxPriceValue = data.map((el) => el.price).sort((a, b) => b - a)[0];
        const minStockValue = data.map((el) => el.stock).sort((a, b) => a - b)[0];
        const maxStockValue = data.map((el) => el.stock).sort((a, b) => b - a)[0];
        const brandsFinded: string[] = data.map((elem: { brand: string, }) => elem.brand.replace(/ /g, ''));
        const categoryFinded: string[] = data.map((el) => el.category);
        const categoryAndBrands = brandsFinded.concat(categoryFinded);
        const objBrandsCategoryFinded: { [key: string]: number } = this.getAmountOfProducts(categoryAndBrands);
        const arrBrandsCategoryFinded = Object.entries(objBrandsCategoryFinded).flat(Infinity);
        const arrStringsBrandsCategoryFinded = arrBrandsCategoryFinded.filter((el) => typeof el === "string");
        for (const span of spansBrandsAndCategory) {
            if (arrStringsBrandsCategoryFinded.includes(span.className)) {
                let index = arrBrandsCategoryFinded.indexOf(span.className);
                span.innerHTML = `${arrBrandsCategoryFinded[index + 1]}`;
                inpPriceOne.value = `${minPriceValue}`;
                inpPriceTwo.value = `${maxPriceValue}`;
                minPrice.textContent = inpPriceOne.value;
                maxPrice.textContent = inpPriceTwo.value;
                inpStockOne.value = `${minStockValue}`;
                inpStockTwo.value = `${maxStockValue}`;
                minStock.textContent = inpStockOne.value;
                maxStock.textContent = inpStockTwo.value;
            }
            else {
                span.innerHTML = "0";
            }
        }
    }

    render(): HTMLElement {

        const layoutCatalog: string = `<main class="main">
            <article class="background" >
                <div class="background__img_top" > </div>
                    < div class="background__img_info" >
                        <p class="background__text" > WINTER 2023 < /p>
                            < button class="background__buttom" > TO CATALOG < /button>
                                < /div>
                                < div class="background__img_left" > </div>
                                    < div class="background__img_right" > </div>
                                        < /article>

                                        < p class="main__header" id = "catalog" > CATALOG < /p>

                                            < section class="products" >
                                                <div class="container" >
                                                    <div class="sort-search" >
                                                        <div class="reset-total" >
                                                            <button class="reset-total__clear-filters" > Reset filters < /button>
                                                                < button class="reset-total__copy-link" > Copy link < /button>
                                                                    < /div>
                                                                    < div class="sort-of-products" >
                                                                        <label for= "sort-of-products" > Sort options: </label>
                                                                            < select name = "products" id = "sort-of-products" class="sort-of-products-select" >
                                                                                <option value="" > --Sort options: --< /option>
                                                                                    < option value = "price-ASC" > Sort by price ASC < /option>
                                                                                        < option value = "price-DESC" > Sort by price DESC < /option>
                                                                                            < option value = "rating-ASC" > Sort by rating ASC < /option>
                                                                                                < option value = "rating-DESC" > Sort by rating DESC < /option>
                                                                                                    < /select>
                                                                                                    < /div>
                                                                                                    < div class="count-of-products" > </div>
                                                                                                        < div class="search" >
                                                                                                            <input type="search" class="search-of-products" placeholder = "Search product" >
                                                                                                                </div>
                                                                                                                < /div>
                                                                                                                < div class="products__wrapper" >
                                                                                                                    <div class="filters" >
                                                                                                                        <div class="filters__category" >
                                                                                                                            <h3 id="filters__category_header" class="filters__header" > CATEGORIES < /h3>
                                                                                                                                < /div>
                                                                                                                                < div class="filters__brand" >
                                                                                                                                    <h3 class="filters__header" > BRANDS < /h3>
                                                                                                                                        < /div>
                                                                                                                                        < div class="filters__price" >
                                                                                                                                            <h3 class="filters__header" > PRICE < /h3>
                                                                                                                                                < div class="price" >
                                                                                                                                                    <div class="values_price" >
                                                                                                                                                        <p class="range-1" > 10 < /p>
                                                                                                                                                            < p class="dash" >& ndash; </p>
                                                                                                                                                                < p class="range-2" > 1749 < /p>
                                                                                                                                                                    < /div>
                                                                                                                                                                    < div class="price__range" >
                                                                                                                                                                        <div class="slider-track" > </div>
                                                                                                                                                                            < input type = "range" class="slider-1" value = "0" min = "10" max = "1749" >
                                                                                                                                                                                <input type="range" class="slider-2" value = "1749" min = "10" max = "1749" >
                                                                                                                                                                                    </div>
                                                                                                                                                                                    < /div>
                                                                                                                                                                                    < /div>
                                                                                                                                                                                    < div class="filters__stock" >
                                                                                                                                                                                        <h3 class="filters__header" > AVAILABLE IN STOCK < /h3>
                                                                                                                                                                                            < div class="stock" >
                                                                                                                                                                                                <div class="values_stock" >
                                                                                                                                                                                                    <p class="range-1" > 2 < /p>
                                                                                                                                                                                                        < p class="dash" >& ndash; </p>
                                                                                                                                                                                                            < p class="range-2" > 150 < /p>
                                                                                                                                                                                                                < /div>
                                                                                                                                                                                                                < div class="stock__range" >
                                                                                                                                                                                                                    <div class="slider-track" > </div>
                                                                                                                                                                                                                        < input type = "range" class="slider-1" value = "0" min = "2" max = "150" >
                                                                                                                                                                                                                            <input type="range" class="slider-2" value = "150" min = "2" max = "150" >
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                < /div>
                                                                                                                                                                                                                                < /div>
                                                                                                                                                                                                                                < /div>
                                                                                                                                                                                                                                < div class="main__products" > </div>
                                                                                                                                                                                                                                    < /div>
                                                                                                                                                                                                                                    < /div>
                                                                                                                                                                                                                                    < /section>

                                                                                                                                                                                                                                    < /main>`
        this.container.innerHTML = layoutCatalog;

        //_________________________Add cards of products to div main__products

        const containerForCards = <HTMLElement>this.container.querySelector('.main__products');
        this.createCardsOfProducts(this.data.products, containerForCards);

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

        const spansContainer = <HTMLElement>this.container.querySelector('.filters');
        const spansBrandsAndCategory = spansContainer.getElementsByTagName('span');
        console.log(spansBrandsAndCategory)



        for (const el of filterCategory) {
            el.addEventListener('click', () => {
                const checked = (<HTMLInputElement>el).checked;
                if (!checked) {
                    this.deleteFilter((<HTMLInputElement>el).value, this.filteraArrCategory);
                } else {
                    this.setFilters((<HTMLInputElement>el).value, this.filteraArrCategory);
                }
                containerForCards.innerHTML = '';
                const filtredData: filtredData = this.getNewData();
                this.createCardsOfProducts(filtredData, containerForCards);
                this.countFoundProducts(filtredData, spansBrandsAndCategory, inputPriceOne, inputPriceTwo, minPrice, maxPrice, inputStockOne, inputStockTwo, minStock, maxStock);

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
                const filtredData: filtredData = this.getNewData();
                this.createCardsOfProducts(filtredData);
                this.countFoundProducts(filtredData, spansBrandsAndCategory, inputPriceOne, inputPriceTwo, minPrice, maxPrice, inputStockOne, inputStockTwo, minStock, maxStock);
            })
        }

        //_________________________Adding filtering functionality by price

        const containerInputsPrice = <HTMLElement>this.container.querySelector('.price__range');
        const inputsPrice: HTMLCollectionOf<HTMLInputElement> = containerInputsPrice.getElementsByTagName('input');
        const inputPriceOne: HTMLInputElement = inputsPrice[0];
        const inputPriceTwo: HTMLInputElement = inputsPrice[1];

        const containerSpansPrice = <HTMLElement>this.container.querySelector('.values_price');
        const minMaxPrice: HTMLCollectionOf<HTMLParagraphElement> = containerSpansPrice.getElementsByTagName('p');
        const minPrice: HTMLParagraphElement = minMaxPrice[0];
        const maxPrice: HTMLParagraphElement = minMaxPrice[2];

        const containerInputsStock = <HTMLElement>this.container.querySelector('.stock__range');
        const inputsStock: HTMLCollectionOf<HTMLInputElement> = containerInputsStock.getElementsByTagName('input');
        const inputStockOne: HTMLInputElement = inputsStock[0];
        const inputStockTwo: HTMLInputElement = inputsStock[1];

        const containerSpansStock = <HTMLElement>this.container.querySelector('.values_stock');
        const minMaxStock: HTMLCollectionOf<HTMLParagraphElement> = containerSpansStock.getElementsByTagName('p');
        const minStock: HTMLParagraphElement = minMaxStock[0];
        const maxStock: HTMLParagraphElement = minMaxStock[2];

        this.functionalRangesPrice(inputPriceOne, inputPriceTwo, minPrice, maxPrice, spansBrandsAndCategory, inputStockOne, inputStockTwo, minStock, maxStock);

        //_________________________Adding filtering functionality by stock

        this.functionalRangesStock(inputStockOne, inputStockTwo, minStock, maxStock, spansBrandsAndCategory, inputPriceOne, inputPriceTwo, minPrice, maxPrice);

        //_______________________Adding filtering functionality by sort

        const options = <HTMLElement>this.container.querySelector('.sort-of-products-select');
        options.addEventListener('change', (event) => {
            const selectedValue: string = (<HTMLInputElement>event.target).value;

            if (selectedValue === "price-ASC") {
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = ""
                this.createCardsOfProducts(filtredData.sort((a, b) => a.price - b.price));
            }
            if (selectedValue === "price-DESC") {
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = ""
                this.createCardsOfProducts(filtredData.sort((a, b) => b.price - a.price));
            }
            if (selectedValue === "rating-ASC") {
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = ""
                this.createCardsOfProducts(filtredData.sort((a, b) => a.rating - b.rating));
            }
            if (selectedValue === "rating-DESC") {
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = ""
                this.createCardsOfProducts(filtredData.sort((a, b) => b.rating - a.rating));
            }
        })

        //_______________________Adding filtering functionality by search

        const inputSearch = <HTMLInputElement>this.container.querySelector('.search-of-products');

        inputSearch.addEventListener('input', () => {

            let val: string = inputSearch.value.trim();
            if (val !== "") {
                this.filterArrSearch = this.searchProduct(this.data.products, val);
                const filtredData: filtredData = this.getNewData();
                const searchedArrData: filtredData = this.searchProduct(filtredData, val)
                containerForCards.innerHTML = "";
                this.createCardsOfProducts(searchedArrData);
            }
            else {
                this.filterArrSearch = [];
                const filtredData: filtredData = this.getNewData();
                containerForCards.innerHTML = "";
                this.createCardsOfProducts(filtredData);
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
            this.createCardsOfProducts(this.data.products)
            this.countFoundProducts(this.data.products, spansBrandsAndCategory, inputPriceOne, inputPriceTwo, minPrice, maxPrice, inputStockOne, inputStockTwo, minStock, maxStock);
        })
        return this.container;
    }
}
export default CatalogPage;
