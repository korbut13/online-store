class CardProduct {
	private container: HTMLElement;
	private containerForButtons: HTMLElement;

	constructor(id: string) {
		this.container = document.createElement('div');
		this.container.id = id;
		this.container.classList.add('card');
		this.containerForButtons = document.createElement('div');
		this.containerForButtons.classList.add('container__button');
	}

	private createDivImg() {
		const divImg = document.createElement('div');
		divImg.classList.add('cardImg');
		return divImg;
	}
	private createImg(linkImg: string) {
		const img = document.createElement('IMG') as HTMLImageElement;
		img.src = linkImg;
		img.classList.add('img');
		return img;
	}
	private createTitleCard(text: string) {
		const titleCard = document.createElement('h1');
		titleCard.innerHTML = text;
		titleCard.classList.add('card__title');
		return titleCard;
	}
	private descriptionCard(category: string, brand: string, price: number, discount: number, rating: number, stock: number) {
		const titleCard = document.createElement('div');
		titleCard.innerHTML = `Category: ${category}<br>Brand: ${brand}<br>Price: &#8364 ${price}<br>Discount: ${discount}% <br>Rating: ${rating}<br>Stock: ${stock}`;
		titleCard.classList.add('card__text');
		return titleCard;
	}
	private buttonToCart() {
		const buttonToCart = document.createElement('button');
		buttonToCart.innerText = 'ADD TO CART';
		buttonToCart.classList.add('card__button');
		return buttonToCart;
	}
	private buttonDetails() {
		const buttonDetails = document.createElement('button');
		buttonDetails.innerText = 'DETAILS';
		buttonDetails.classList.add('card__button');
		return buttonDetails;
	}
	createCard(imgLink: string, titleCard: string, categoryCard: string, brandCard: string, priceCard: number, discountCard: number, ratingCard: number, stockCard: number) {
		const divImg = this.createDivImg();
		this.container.append(divImg);
		const imgCard = this.createImg(imgLink);
		divImg.append(imgCard);
		const title = this.createTitleCard(titleCard);
		this.container.append(title)
		const description = this.descriptionCard(categoryCard, brandCard, priceCard, discountCard, ratingCard, stockCard);
		this.container.append(description);
		const buttonToCart = this.buttonToCart();
		this.containerForButtons.append(buttonToCart);
		const buttonDetails = this.buttonDetails();
		this.containerForButtons.append(buttonDetails);
		this.container.append(this.containerForButtons)
		return this.container;
	}
}
export default CardProduct;
