import { XpathUtil } from "../../../../utils/common/XpathUtil";
import { RegisterUserData } from "../../resources/customTypes/bookcart/registerData";
import { BasePage } from "../base/basePage";

export class RegisterPage extends BasePage {
    constructor() {
        super();
    }

    private locators = {
        firstNameInputField: "//input[@placeholder='First name']",
        lastNameInputField: "//input[@placeholder='Last Name']",
        userNameInputFiled: "//input[@placeholder='User name']",
        passwordInputField: "//input[@placeholder='Password']",
        confirmedPasswordInputField: "//input[@placeholder='Confirm Password']",
        genderRadioButton: "//input[@type='radio' and @value='##PLACEHOLDER##']/parent::div",
        registerButton: "//form//span[contains(text(), 'Register')]/parent::button",
    };

    async clickRegisterButton(): Promise<void> {
        await browser.pause(1000);
        await this.waitForClickable(this.locators.registerButton);
        await this.click(this.locators.registerButton);
    }

    async enterUserDetails(user: RegisterUserData): Promise<void> {
        await this.setValue(this.locators.firstNameInputField, user.firstName);
        await this.setValue(this.locators.lastNameInputField, user.lastName);
        await this.setValue(this.locators.userNameInputFiled, user.userName);
        await this.setValue(this.locators.passwordInputField, user.password);
        await this.setValue(this.locators.confirmedPasswordInputField, user.password);
        await this.click(XpathUtil.getPlaceholderReplaced(this.locators.genderRadioButton, user.gender));
        await this.clickRegisterButton();
    }
}