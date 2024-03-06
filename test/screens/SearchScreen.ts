import { XpathUtil } from "../../utils/common/XpathUtil";
import { LOGGER } from "../../utils/reporting/LoggerHelper";
import { Product } from "../resources/customTypes/ProductDetails";
import { BaseScreen } from "./base/BaseScreen";
import { expect } from "chai";

export class SearchScreen extends BaseScreen {
    constructor() {
        super();
    }

    private locators = {
        moreButton: "#txt-more",
        productEle: "#ele-auto-suggestion",
        productNameEle: "//android.widget.TextView[@text='##PLACEHOLDER##']",
        searchButton: "#btn-search"
    }

    async clickOnMoreButton(): Promise<void> {
        await this.click(this.locators.moreButton);
    }

    async clickOnSearchButton(): Promise<void> {
        await this.click(this.locators.searchButton);
    }

    async validateProductList(productList: Product[]): Promise<void> {
        try {
            const firstProductEle = await this.getElement(this.locators.productEle);
            for (const product of productList) {
                const isProductDisplayed: boolean = await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.productNameEle, product.name));
                expect(isProductDisplayed, `Product ${product.name} not displayed.`).to.be.true;
                await this.swipeTillElement(firstProductEle, 5, true);
            }
        } catch (err) {
            LOGGER.error(`Error while validating suggested produts.\n${err.stack}`);
            throw err;
        }
    }
}