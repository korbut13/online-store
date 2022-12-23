import Page from '../../core/templates/page';
import './style.css';
import { data } from '../../core/components/data/getsData';
import CardProduct from '../../core/templates/cardProducts';

class CatalogPage extends Page {
	static TextObject = {
		MainTitle: 'Catalog Page',
	};
	data = data;
	private cardExemp: CardProduct;

	constructor(id: string) {
		super(id);
		this.cardExemp = new CardProduct();
	}
	render() {
		const layoutCatalog = `<main class="main">
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
								<h3 class="filters__header">CATEGORIES</h3>
								<div class="category">
									<input type="checkbox" class="category__input" id="blouses" value="blouses">
									<label for="blouses" class="category__label">BLOUSES</label>
									<span class="category__span">(5/5)</span>
								</div>
								<div class="category">
									<input type="checkbox" class="category__input" id="pants" value="pants">
									<label for="pants" class="category__label">PANTS</label>
									<span class="category__span">(5/5)</span>
								</div>
								<div class="category">
									<input type="checkbox" class="category__input" id="jeans" value="jeans">
									<label for="jeans" class="category__label">JEANS</label>
									<span class="category__span">(5/5)</span>
								</div>
								<div class="category">
									<input type="checkbox" class="category__input" id="dresses">
									<label for="dresses" class="category__label">DRESSES</label>
									<span class="category__span">(5/5)</span>
								</div>
								<div class="category">
									<input type="checkbox" class="category__input" id="skirts">
									<label for="skirts" class="category__label">SKIRTS</label>
									<span class="category__span">(5/5)</span>
								</div>
							</div>
							<div class="filters__brand">
								<h3 class="filters__header">BRANDS</h3>
								<div class="category">
									<input type="checkbox" class="category__input" id="hm">
									<label for="hm" class="category__label">H&M</label>
									<span class="category__span">(5/5)</span>
								</div>
								<div class="category">
									<input type="checkbox" class="category__input" id="mango">
									<label for="mango" class="category__label">MANGO</label>
									<span class="category__span">(5/5)</span>
								</div>
								<div class="category">
									<input type="checkbox" class="category__input" id="reserved">
									<label for="reserved" class="category__label">RESERVED</label>
									<span class="category__span">(5/5)</span>
								</div>
								<div class="category">
									<input type="checkbox" class="category__input" id="top_secret">
									<label for="top_secret" class="category__label">TOP SECRET</label>
									<span class="category__span">(5/5)</span>
								</div>
								<div class="category">
									<input type="checkbox" class="category__input" id="zara">
									<label for="zara" class="category__label">ZARA</label>
									<span class="category__span">(5/5)</span>
								</div>
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
		const containerCards = this.container.querySelector('.main__products') as HTMLElement;
		for (const product of this.data.products) {
			this.cardExemp = new CardProduct();
			const card = this.cardExemp.createCard(product.images[0], product.title);
			containerCards.append(card)
		}
		return this.container;
	}
}

export default CatalogPage;
