
import MainPage from "../main/index";

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