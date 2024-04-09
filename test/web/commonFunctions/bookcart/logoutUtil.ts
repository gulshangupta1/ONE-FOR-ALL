import { BasePage } from "../../pages/base/basePage";
import { HomePage } from "../../pages/bookcart/homePage";

export class LogoutUtil extends BasePage {
    private homePage: HomePage;

    constructor() {
        super();
        this.homePage = new HomePage();
    }

    async logout() {
        await this.homePage.clickAccountDropdown();
        await this.homePage.clickLogoutButton();
        await this.waitForDisplayed(await this.homePage.getLoginButtonEle());
    }
}