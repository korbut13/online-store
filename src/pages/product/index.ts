import Page from "../../core/templates/page";
import './style.css';
import { DataObject, data } from '../../core/components/data/getsData';
import { IProduct } from '../../core/components/data/getsData';
import Product from "../../core/templates/product";

class ProductPage extends Page {
    static TextObject = {
        MainTitle: 'Product Page',
    };
    data = data;
    private product: Product;

    constructor(id: string) {
        super(id);
        this.product = new Product(id);
    }

    createProduct(obj: IProduct) {
        const containerForProduct = <HTMLElement>this.container.querySelector('.product');
        this.product = new Product(`${obj.id}`);
        const changeProduct = this.product.renderProduct(obj.title, obj.images, obj.images[obj.images.length - 1], obj.description, obj.discountPercentage, obj.rating,
            obj.stock, obj.brand, obj.category, obj.price);
        containerForProduct.append(changeProduct);

    }

    render(): HTMLElement {
        const layout = `<div class="container__product">
        <div class="wrapper">
            <div class="product"></div>
        </div>
    </div>`

        this.container.innerHTML = layout;
        const link = window.location.hash;
        const arrLink = link.split('/');
        const idProduct = +arrLink[arrLink.length - 1]
        const objProduct = this.data.products.filter((el) => el.id === idProduct);
        this.createProduct(objProduct[0]);

        const mainImg = <HTMLImageElement>this.container.querySelector('.mainImg');
        const allImages = <HTMLCollectionOf<HTMLImageElement>>this.container.getElementsByClassName('allImg');
        for (const img of allImages) {
            img.addEventListener('click', () => {
                mainImg.src = img.src;
            })
        }



        return this.container
    }
}
export default ProductPage
