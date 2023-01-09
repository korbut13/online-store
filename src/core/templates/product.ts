import App from "../../pages/app";
import { ButtonText } from "./cardProducts";
import { PageIds } from "../../pages/app";

class Product {
    private containerProduct: HTMLElement;

    constructor(id: string) {
        this.containerProduct = document.createElement('div');
        this.containerProduct.classList.add('containerProduct');
        this.containerProduct.id = id;
    }
    private createBreadCrumbs(category: string, brand: string, title: string) {
        const breadCrumpsCont = document.createElement('div');
        breadCrumpsCont.classList.add('breadCrumpsCont');

        const storeBrCrupms = document.createElement('a');
        storeBrCrupms.innerHTML = 'STORE';
        storeBrCrupms.classList.add('linkTostore');
        storeBrCrupms.href = `#${PageIds.CatalogPage}`;

        const quotes1 = document.createElement('p');
        quotes1.classList.add('textBrCrupms');
        quotes1.innerHTML = '>>';

        const categoryBrCrupms = document.createElement('p');
        categoryBrCrupms.classList.add('textBrCrupms');
        categoryBrCrupms.innerHTML = category;

        const quotes2 = document.createElement('p');
        quotes2.classList.add('textBrCrupms');
        quotes2.innerHTML = '>>';

        const brandBrCrupms = document.createElement('p');
        brandBrCrupms.classList.add('textBrCrupms');
        brandBrCrupms.innerHTML = brand;

        const quotes3 = document.createElement('p');
        quotes3.classList.add('textBrCrupms');
        quotes3.innerHTML = '>>';

        const titleBrCrupms = document.createElement('p');
        titleBrCrupms.classList.add('textBrCrupms');
        titleBrCrupms.innerHTML = title;

        breadCrumpsCont.append(storeBrCrupms, quotes1, categoryBrCrupms, quotes2, brandBrCrupms, quotes3, titleBrCrupms);
        return breadCrumpsCont;

    }
    private createTitle(title: string): HTMLDivElement {
        const titleProduct = document.createElement('div');
        titleProduct.classList.add('titleProduct')
        titleProduct.innerHTML = title;
        return titleProduct;
    }
    private createDescriptionProduct() {
        const description = document.createElement('div');
        description.classList.add('description');
        return description;
    }
    private createAllImages(arrLinks: string[]): HTMLDivElement {
        const allImages = document.createElement('div');
        allImages.classList.add('allImages');
        for (const link of arrLinks) {
            const containerImgs = document.createElement('div');
            containerImgs.classList.add('containerImgs');
            const img = document.createElement('img');
            img.src = link;
            img.classList.add('allImg');
            containerImgs.append(img);
            allImages.append(containerImgs);
        }
        return allImages;
    }
    private createImage(linkImg: string) {
        const containerOneImg = document.createElement('div');
        containerOneImg.classList.add('containerOneImg');
        const wrappForImg = document.createElement('div');
        wrappForImg.classList.add('wrappForImg');
        const mainImg = document.createElement('img');
        mainImg.classList.add('mainImg');
        mainImg.src = linkImg;
        wrappForImg.append(mainImg);
        containerOneImg.append(wrappForImg);
        return containerOneImg;
    }
    private textProduct(description: string, discount: number, rating: number, stock: number, brand: string, category: string) {
        const containerText = document.createElement('div');
        containerText.classList.add('containerText');

        const descriprionCont = document.createElement('div');
        descriprionCont.classList.add('descriprionCont');
        const descriprionHeader = document.createElement('h3');
        descriprionHeader.innerHTML = "Description:";
        descriprionHeader.classList.add('description-header');
        const descriptionText = document.createElement('p');
        descriptionText.classList.add('description-text');
        descriptionText.innerHTML = description;
        descriprionCont.append(descriprionHeader, descriptionText);

        const discountСont = document.createElement('div');
        discountСont.classList.add('discountont');
        const discountHeader = document.createElement('h3');
        discountHeader.innerHTML = "Discount Percentage:";
        discountHeader.classList.add('description-header');
        const discountText = document.createElement('p');
        discountText.classList.add('description-text');
        discountText.innerHTML = `${discount}`;
        discountСont.append(discountHeader, discountText);

        const ratingCont = document.createElement('div');
        ratingCont.classList.add('ratingCont');
        const ratingHeader = document.createElement('h3');
        ratingHeader.classList.add('description-header');
        ratingHeader.innerHTML = "Rating:";
        const ratingText = document.createElement('p');
        ratingText.classList.add('description-text');
        ratingText.innerHTML = `${rating}`;
        ratingCont.append(ratingHeader, ratingText);

        const stockCont = document.createElement('div');
        stockCont.classList.add('stockCont');
        const stockHeader = document.createElement('h3');
        stockHeader.classList.add('description-header');
        stockHeader.innerHTML = "Stock:";
        const stockText = document.createElement('p');
        stockText.classList.add('description-text');
        stockText.innerHTML = `${stock}`;
        stockCont.append(stockHeader, stockText);

        const brandCont = document.createElement('div');
        brandCont.classList.add('brandCont');
        const brandHeader = document.createElement('h3');
        brandHeader.classList.add('description-header');
        brandHeader.innerHTML = "Brand:";
        const brandText = document.createElement('p');
        brandText.classList.add('description-text');
        brandText.innerHTML = brand;
        brandCont.append(brandHeader, brandText);

        const categoryCont = document.createElement('div');
        categoryCont.classList.add('categoryCont');
        const categoryHeader = document.createElement('h3');
        categoryHeader.classList.add('description-header');
        categoryHeader.innerHTML = "Category:";
        const categoryText = document.createElement('p');
        categoryText.classList.add('description-text');
        categoryText.innerHTML = category;
        categoryCont.append(categoryHeader, categoryText);

        containerText.append(descriprionCont, discountСont, ratingCont, stockCont, brandCont, categoryCont);
        return containerText;
    }
    private createPrice(price: number) {
        const priceCont = document.createElement('div');
        priceCont.classList.add('priceCont');

        const priceValue = document.createElement('p');
        priceValue.classList.add('priceValue');
        priceValue.innerHTML = `&euro;${price}`;

        const buttonToCart = <HTMLButtonElement>document.createElement('button');
        if (App.chosenProducts[this.containerProduct.id]) {
            buttonToCart.innerText = ButtonText.DROP_FROM_CART;
        } else {
            buttonToCart.innerText = ButtonText.ADD_TO_CART;
        }

        buttonToCart.classList.add('card__button');

        buttonToCart.addEventListener('click', () => {
            if (App.chosenProducts[this.containerProduct.id]) {
                buttonToCart.innerText = ButtonText.ADD_TO_CART;
                delete App.chosenProducts[this.containerProduct.id];
            } else {
                App.chosenProducts[this.containerProduct.id] = 1;
                buttonToCart.innerText = ButtonText.DROP_FROM_CART;
            }
            localStorage.setItem('productsInCart', JSON.stringify(App.chosenProducts));
        });

        const buttonBuyNow = <HTMLButtonElement>document.createElement('button');
        buttonBuyNow.innerHTML = "BUY NOW"
        buttonBuyNow.classList.add('card__button');

        priceCont.append(priceValue, buttonToCart, buttonBuyNow);
        return priceCont;
    }
    renderProduct(title: string, arrLinks: string[], linkImg: string, description: string, discount: number, rating: number, stock: number, brand: string, category: string, price: number) {
        const breadCrumps = <HTMLDivElement>this.createBreadCrumbs(category, brand, title);
        const titleProduct = <HTMLDivElement>this.createTitle(title);
        const aboutProduct = <HTMLDivElement>this.createDescriptionProduct();
        aboutProduct.append(this.createAllImages(arrLinks), this.createImage(linkImg), this.textProduct(description, discount, rating, stock, brand, category), this.createPrice(price));
        this.containerProduct.append(breadCrumps, titleProduct, aboutProduct);
        return this.containerProduct;
    }
}

export default Product;
