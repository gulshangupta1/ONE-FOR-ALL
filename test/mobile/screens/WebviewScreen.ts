import { BaseScreen } from "./base/BaseScreen";

export class WebviewScreen extends BaseScreen {
    constructor() {
        super();
    }

    private locators = {
        backButton: "//span[@class='backButton']",
        searchButton: "//button[@class='search-button']",
        searchField: "//input[@type='search']",
    }

    async clickOnBackButton() {
        await this.click(this.locators.backButton);
    }

    async validateWebviewScreen() {
        await this.waitForDisplayed(this.locators.backButton);
        await this.waitForDisplayed(this.locators.searchButton);
        await this.waitForDisplayed(this.locators.searchField);
    }
}