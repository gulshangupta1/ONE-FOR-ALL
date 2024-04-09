import { BasePage } from "../base/basePage";

export class LoginPage extends BasePage {
    constructor() {
        super();
    }

    private locators = {
        userNameInputField: "//input[@name='username']",
        passwordInputField: "//input[@name='password']",
        submitButton: "//button[@type='submit']"
    };

    async login(username: string, password: string): Promise<void> {
        await this.setValue(this.locators.userNameInputField, username);
        await this.setValue(this.locators.passwordInputField, password);
        await this.click(this.locators.submitButton);
    }
}