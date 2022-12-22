import Page from "../../core/templates/page";
import MainPage from "../main/index";
import FiltresPage from "../filtres/index";
import * as e from "express";

export const enum PageIds {
	MainPage = 'main-page',
	FiltresPage = 'blouses'
}

class App {
	private static container: HTMLElement = document.querySelector('.main__products');
	private initialPage: MainPage;

	static renderNewPage(idPage: string) {

		App.container.innerHTML = '';
		let page: Page | null = null;

		if (idPage === PageIds.MainPage) {
			page = new MainPage(idPage)
		} else if (idPage === PageIds.FiltresPage) {
			page = new FiltresPage(idPage)
		}

		if (page) {
			const pageHTML = page.render();
			App.container.append(pageHTML)
		}
	}

	private enableRouteChange() {
		window.addEventListener('hashchange', () => {
			const hash = window.location.hash.slice(1);
			App.renderNewPage(hash);
		})
	}

	constructor() {
		this.initialPage = new MainPage('main-page');
	}

	run() {
		App.renderNewPage('main-page')
		this.enableRouteChange();
	}

	addFilterEvent() {
		const filter = document.getElementsByClassName('category__input');

		for (const el of filter) {
			el.addEventListener("click", () => {
				this.initialPage.setFilters((<HTMLInputElement>el).value);
				App.container.innerHTML = '';
				App.container.append(this.initialPage.render());
			})
		}
	}
}
export default App;