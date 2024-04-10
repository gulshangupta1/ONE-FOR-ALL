import { BasePage } from "../pages/base/basePage";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

export class LoginUtil extends BasePage {
    private homePage: HomePage;
    private loginPage: LoginPage;

    constructor() {
        super();
        this.homePage = new HomePage();
        this.loginPage = new LoginPage();
    }

    async login(username: string, password: string): Promise<void> {
        const isLoginButtonDisplayed: boolean = await this.isDisplayed(await this.loginPage.getLoginButtonEle());
        if (!isLoginButtonDisplayed)
            await this.homePage.clickLoginButton();

        await this.loginPage.enterUsername(username);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLoginButton();
        await this.waitForDisplayed(await this.homePage.getLoggedInUserNameEle(username));
    }
}