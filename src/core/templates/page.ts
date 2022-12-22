
abstract class Page {
	protected container: HTMLElement;
	static TextObject = {};

	constructor(id: string) {
		this.container = document.createElement('div');
		this.container.id = id;
		this.container.classList.add('main__products')
	}

	render() {
		return this.container
	}
}

export default Page

