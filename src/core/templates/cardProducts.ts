class CardProduct {
	private container: HTMLElement;

	constructor() {
		this.container = document.createElement('div');
		this.container.classList.add('card');
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
		titleCard.classList.add('card__text');
		return titleCard;
	}
	createCard(imgLink: string, titleCard: string) {
		const divImg = this.createDivImg();
		this.container.append(divImg);
		const imgCard = this.createImg(imgLink);
		divImg.append(imgCard);
		const title = this.createTitleCard(titleCard);
		this.container.append(title);
		return this.container;
	}
}
export default CardProduct;