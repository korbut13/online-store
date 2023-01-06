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
        this.product = new Product();
    }

    createProduct(obj: IProduct) {
        const containerForProduct = <HTMLElement>this.container.querySelector('.product');
        this.product = new Product();
        const changeProduct = this.product.renderProduct(obj.title, obj.images, obj.images[obj.images.length - 1], obj.description, obj.discountPercentage, obj.rating,
            obj.stock, obj.brand, obj.category, obj.price);
        containerForProduct.append(changeProduct);

    }

    render(): HTMLElement {
        const layout = `<div class="container">
        <div class="wrapper">
            <div class="bread-crumps"></div>
            <div class="product"></div>
        </div>
    </div>`

        this.container.innerHTML = layout;
        const idProduct = window.location.hash.slice(-1);
        const objProduct = this.data.products.filter((el) => el.id === +idProduct)
        console.log("IDPRODUCT", objProduct)
        this.createProduct(objProduct[0]);


        return this.container
    }
}
export default ProductPage
