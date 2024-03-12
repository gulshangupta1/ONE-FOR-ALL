import { BaseScreen } from "./base/BaseScreen";

export class WelcomeScreen extends BaseScreen {
    constructor() {
        super();
    }

    private locators = {
        loginButton: "#txt-login",
        registerButton: "#txt-register",
    }

    async clickLoginButton() {
        await this.click(this.locators.loginButton);
    }

    async clickRegister() {
        await this.click(this.locators.registerButton);
    }
}