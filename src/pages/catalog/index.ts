import Page from '../../core/templates/page';
import './style.css';

class CatalogPage extends Page {
	static TextObject = {
		MainTitle: 'Catalog Page',
	};

	constructor(id: string) {
		super(id);
	}

	render() {
		const layoutCatalog = `<main class="main">
		<article class="background">
			<div class="background__img_top"></div>
			<div class="background__img_info">
				<p class="background__text">ЗИМА 2023</p>
				<button class="background__buttom">В КАТАЛОГ</button>
			</div>
			<div class="background__img_left"></div>
			<div class="background__img_right"></div>
		</article>

		<p class="main__header" id="catalog">КАТАЛОГ</p>

		<section class="products">
			<div class="container">
				<div class="products__wrapper">
					<div class="filters">
						<div class="filters__category">
							<h3 class="filters__header">КАТЕГОРИЯ</h3>
							<div class="category">
								<input type="checkbox" class="category__input" id="smartphones" value="smartphones">
								<label for="smartphones" class="category__label">СМАРТФОНЫ</label>
								<span class="category__span">(5/5)</span>
							</div>
							<div class="category">
								<input type="checkbox" class="category__input" id="laptops" value="laptops">
								<label for="laptops" class="category__label">НОУТБУКИ</label>
								<span class="category__span">(5/5)</span>
							</div>
							<div class="category">
								<input type="checkbox" class="category__input" id="jeans" jeans>
								<label for="jeans" class="category__label">ДЖИНСЫ</label>
								<span class="category__span">(5/5)</span>
							</div>
							<div class="category">
								<input type="checkbox" class="category__input" id="dress">
								<label for="dress" class="category__label">ПЛАТЬЯ</label>
								<span class="category__span">(5/5)</span>
							</div>
							<div class="category">
								<input type="checkbox" class="category__input" id="skirts">
								<label for="skirts" class="category__label">ЮБКИ</label>
								<span class="category__span">(5/5)</span>
							</div>
						</div>
						<div class="filters__brand">
							<h3 class="filters__header">БРЕНД</h3>
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
							<h3 class="filters__header">ЦЕНА</h3>
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
							<h3 class="filters__header">НАЛИЧИЕ НА СКЛАДЕ</h3>
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
		this.container.innerHTML = layoutCatalog
		return this.container;
	}
}

export default CatalogPage;
