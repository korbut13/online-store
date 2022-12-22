import Page from '../../core/templates/page';

class CatalogPage extends Page {
	static TextObject = {
		MainTitle: 'Catalog Page',
	};

	constructor(id: string) {
		super(id);
	}

	render() {
		const title = this.createTitle(CatalogPage.TextObject.MainTitle);
		this.container.append(title);
		return this.container;
	}
}

export default CatalogPage;
