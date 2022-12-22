
class CardProduct {
	private container: HTMLElement;
	private cont: HTMLElement;

	constructor(id: string) {
		this.container = document.createElement('div');
		this.container.id = id;
		this.container.classList.add('card');
	}
	private createImgDiv() {
		const divImg = document.createElement('div');
		divImg.classList.add('cardImg');
		return divImg;
	}

	private createImg(imgLink) {
		const img = document.createElement('IMG') as HTMLImageElement;
		img.src = imgLink;
		img.classList.add('img')
		return img;
	}

	private createHeaderTitle(text: string) {
		const headerTitle = document.createElement('h1');
		headerTitle.innerText = text;
		headerTitle.classList.add('card__text')
		return headerTitle;
	}
	createCard(imgLink, headerTitle) {
		const divPicture = this.createImgDiv();
		this.container.append(divPicture);
		const picture = this.createImg(imgLink);
		divPicture.append(picture)
		const title = this.createHeaderTitle(headerTitle);
		this.container.append(title);
		return this.container
	}
}

export default CardProduct
