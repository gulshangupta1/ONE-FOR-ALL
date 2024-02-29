import { BaseScreen } from "./base/BaseScreen";

export class HomeScreen extends BaseScreen {
    private locators = {
        bagIcon: "id:com.ultralesson.ulshopify:id/img-shopping-bag",
        bestSellersTitle: "//android.widget.TextView[@text='Best Sellers']",
        footer: "id:com.ultralesson.ulshopify:id/txt-footer"
    }

    async clickBagIcon(): Promise<void> {
        await this.click(this.locators.bagIcon);
    }

    async swipeTillFooter() {
        await this.waitForDisplayed(this.locators.bagIcon);
        await this.swipeTillElement(this.locators.footer);
    }
}