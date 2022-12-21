// import MainPage from "../main/index";
// import SettingPage from "../settings/index";
// import Page from "../../core/templates/page"

// export const enum PageIds {
// 	MainPage = 'main-page',
// 	SettingPage = 'setting-page'
// }

// class App {
// 	private static container: HTMLElement = document.querySelector('.main__products');
// 	private initialPage: MainPage;

// 	static renderNewPage(idPage: string) {
// 		App.container.innerHTML = '';
// 		let page: Page | null = null;

// 		if (idPage === PageIds.MainPage) {
// 			page = new MainPage(idPage)
// 		} else if (idPage === PageIds.SettingPage) {
// 			page = new SettingPage(idPage)
// 		}

// 		if (page) {
// 			const pageHTML = page.render();
// 			App.container.append(pageHTML)
// 		}
// 	}
// 	private enableRoutChange() {
// 		window.addEventListener('hashchange', () => {
// 			const hash = window.location.hash.slice(1);
// 			App.renderNewPage(hash);
// 		});
// 	}

// 	constructor() {
// 		this.initialPage = new MainPage('main-paige')
// 	}
// 	run() {
// 		App.renderNewPage('setting-page');
// 		this.enableRoutChange()
// 	}
// }
// export default App;

import MainPage from "../main/index";
// import SettingPage from "../settings/index";
// import Page from "../../core/templates/page"

export const enum PageIds {
	MainPage = 'main-page',
	SettingPage = 'setting-page'
}

class App {
	private container: HTMLElement;
	private initialPage: MainPage;

	constructor() {
		this.container = document.querySelector('.main__products');
		this.initialPage = new MainPage('main-page');
	}
	run() {
		const mainPageHTML = this.initialPage.render();
		this.container.append(mainPageHTML);
	}
}
export default App;