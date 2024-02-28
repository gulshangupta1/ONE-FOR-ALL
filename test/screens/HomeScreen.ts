import { BaseScreen } from "./base/BaseScreen";

export class HomeScreen extends BaseScreen {
    private locators = {
        bagIcon: "id:com.ultralesson.ulshopify:id/img-shopping-bag",
    }

    async clickBagIcon() {
        await this.click(this.locators.bagIcon);
    }
}