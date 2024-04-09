import { BasePage } from "../base/basePage";

export class DashboardPage extends BasePage {
    constructor() {
        super();
    }

    private locators = {
        dashboardHead: "//h6[text()='Dashboard']"
    }

    async getDashboardHeadEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.dashboardHead);
    }
}