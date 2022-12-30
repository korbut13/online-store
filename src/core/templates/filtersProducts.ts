// class FilterProduct {
// 	private container: HTMLElement;
// 	private input: HTMLElement;
// 	private label: HTMLElement;
// 	private span: HTMLElement;

// 	constructor() {
// 		this.container = document.createElement('div');
// 		this.container.classList.add('category');
// 		this.input = document.createElement('input');
// 		this.input.setAttribute('type', 'checkbox');
// 		this.input.classList.add('category__input');
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

class FilterProduct {
	private container: HTMLElement;
	private input: HTMLElement;
	private label: HTMLElement;
	private span: HTMLElement;

	constructor(nameClass: string) {
		this.container = document.createElement('div');
		this.container.classList.add('category');
		this.input = document.createElement('input');
		this.input.setAttribute('type', 'checkbox');
		// this.input.classList.add('category__input');
		this.input.classList.add(nameClass);
		this.label = document.createElement('label');
		this.label.classList.add('category__label');
		this.span = document.createElement('span');
		this.span.classList.add('category__span')
	}
	renderCheckbox(value: string, count: number): HTMLElement {
		this.input.setAttribute('value', value);
		this.input.setAttribute('id', value);
		this.label.setAttribute('for', value);
		this.label.innerHTML = value;
		this.span.innerHTML = `(${count})`
		this.container.append(this.input);
		this.container.append(this.label);
		this.container.append(this.span);
		return this.container;
	}
}

export default FilterProduct;
