import { XpathUtil } from "../../../utils/common/XpathUtil";
import { BasePage } from "./base/basePage";

export class HomePage extends BasePage {
    constructor() {
        super();
    }

    private locators = {
        loginButton: "//span[contains(text(), 'Login')]/parent::button",
        accoutDropdown: "//mat-icon[contains(text(), 'arrow_drop_down')]/parent::a",
        logoutButton: "//span[text()='Logout']/parent::button",
        loggedInUserName: "//span[contains(text(), '##PLACEHOLDER##')]",
    }

    async clickLoginButton(): Promise<void> {
        await this.click(this.locators.loginButton);
    }

    async clickAccountDropdown(): Promise<void> {
        await this.click(this.locators.accoutDropdown);
    }

    async clickLogoutButton(): Promise<void> {
        await this.click(this.locators.logoutButton);
    }

    async getLoggedInUserNameEle(username: string): Promise<WebdriverIO.Element> {
        return await $(XpathUtil.getPlaceholderReplaced(this.locators.loggedInUserName, username));
    }

    async getLoginButtonEle() {
        return await $(this.locators.loginButton);
    }
}