import { BasePage } from "../base/basePage";

export class LoginPage extends BasePage {
    constructor() {
        super();
    }

    private locators = {
        registerButton: "//span[contains(text(), 'Register')]/parent::button",
        userNameInputField: "//input[@placeholder='Username']",
        passwordInputField: "//input[@placeholder='Password']",
        loginButton: "//form//button//span[text()='Login']",

    }

    async clickRegisterButton(): Promise<void> {
        await this.click(this.locators.registerButton);
    }

    async enterUsername(username: string): Promise<void> {
        await this.setValue(this.locators.userNameInputField, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.setValue(this.locators.passwordInputField, password);
    }

    async clickLoginButton(): Promise<void> {
        await this.click(this.locators.loginButton);
    }

    async getLoginButtonEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.loginButton);
    }
}