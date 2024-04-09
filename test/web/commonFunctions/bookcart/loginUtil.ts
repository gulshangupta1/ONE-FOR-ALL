import { BasePage } from "../../pages/base/basePage";
import { HomePage } from "../../pages/bookcart/homePage";
import { LoginPage } from "../../pages/bookcart/loginPage";

export class LoginUtil extends BasePage {
    private homePage: HomePage;
    private loginPage: LoginPage;

    constructor() {
        super();
        this.homePage = new HomePage();
        this.loginPage = new LoginPage();
    }

    async login(username: string, password: string): Promise<void> {
        if (!await this.isDisplayed(await this.loginPage.getLoginButtonEle()))
            await this.homePage.clickLoginButton();

        await this.loginPage.enterUsername(username);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLoginButton();
        await this.waitForDisplayed(await this.homePage.getLoggedInUserNameEle(username));
    }
}