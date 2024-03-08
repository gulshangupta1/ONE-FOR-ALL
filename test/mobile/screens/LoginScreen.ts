import { BaseScreen } from "./base/BaseScreen";

export class LoginScreen extends BaseScreen {
    constructor() {
        super();
    }

    private locators = {
        emialInputField: "#inp-email",
        passwordInputField: "#inp-password",
        loginButton: "#txt-login",
    }

    async enterEmail(email: string) {
        await this.setValue(this.locators.emialInputField, email);
    }

    async enterPassword(password: string) {
        await this.setValue(this.locators.passwordInputField, password);
    }

    async clickLoginButton() {
        await this.click(this.locators.loginButton);
    }

    async enterLoginDetails(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await driver.hideKeyboard();
    }
}