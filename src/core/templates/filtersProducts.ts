// class FilterProduct {
// 	private container: HTMLElement;
// 	private input: HTMLElement;
// 	private label: HTMLElement;
// 	private span: HTMLElement;

// 	constructor(nameClass: string) {
// 		this.container = document.createElement('div');
// 		this.container.classList.add('category');
// 		this.input = document.createElement('input');
// 		this.input.setAttribute('type', 'checkbox');
// 		this.input.classList.add(nameClass);
// 		this.label = document.createElement('label');
// 		this.label.classList.add('category__label');
// 		this.span = document.createElement('span');
// 		this.span.classList.add('category__span')
// 	}
// 	renderCheckbox(value: string, count: number): HTMLElement {
// 		this.input.setAttribute('value', value);
// 		this.input.setAttribute('id', value);
// 		this.label.setAttribute('for', value);
// 		this.label.innerHTML = value;
// 		this.span.innerHTML = `(${count})`
// 		this.container.append(this.input);
// 		this.container.append(this.label);
// 		this.container.append(this.span);
// 		return this.container;
// 	}
// }

// export default FilterProduct;

class FilterProduct {
	private container: HTMLElement;
	private input: HTMLElement;
	private label: HTMLElement;
	private slash: HTMLElement;
	private countAllProducts: HTMLElement;
	private countFindproducts: HTMLElement;

	constructor(inputNameClass: string, spanNameClass: string) {
		this.container = document.createElement('div');
		this.container.classList.add('category');
		this.input = document.createElement('input');
		this.input.setAttribute('type', 'checkbox');
		this.input.classList.add(inputNameClass);
		this.label = document.createElement('label');
		this.label.classList.add('category__label');
		this.slash = document.createElement('p');
		this.slash.classList.add('category__span');
		this.countFindproducts = document.createElement('span');
		this.countFindproducts.classList.add(spanNameClass);
		this.countAllProducts = document.createElement('p');
		this.countAllProducts.classList.add('category__span');
	}
	renderCheckbox(value: string, countAll: number): HTMLElement {
		this.input.setAttribute('value', value);
		this.input.setAttribute('id', value);
		this.label.setAttribute('for', value);
		this.label.innerHTML = value;
		this.countFindproducts.innerHTML = `${countAll}`;
		this.slash.innerHTML = '/'
		this.countAllProducts.innerHTML = `${countAll}`
		this.container.append(this.input);
		this.container.append(this.label);
		this.container.append(this.countFindproducts);
		this.container.append(this.slash);
		this.container.append(this.countAllProducts);
		return this.container;
	}
}

export default FilterProduct;
