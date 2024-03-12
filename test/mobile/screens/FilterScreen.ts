import { SwipeUtils } from "../../../utils/actions/SwipeUtils";
import { LOGGER } from "../../../utils/reporting/LoggerHelper";
import { BaseScreen } from "./base/BaseScreen";

export class FilterScreen extends BaseScreen {
    swipeUtil: SwipeUtils;
    constructor() {
        super();
        this.swipeUtil = new SwipeUtils();
    }

    private locators = {
        header: "//android.widget.TextView[@text='##PLACEHOLDER##']",   // Explore More!!
        filterIcon: "#icon-filters",
        minPriceInputField: "#inp-minimum-price",
        maxPriceInputField: "#inp-maximum-price",
        applyFilterButton: "#txt-apply-filters",
        closeFilterButton: "#txt-close-filters",
        productPrice: "#txt-product-price"
        // productPrice: "//android.widget.TextView[@text='₹']/following-sibling::android.widget.TextView",
    };

    async clickOnFilterIcon(): Promise<void> {
        await this.click(this.locators.filterIcon);
    }

    async setMinPrice(price: number): Promise<void> {
        await this.setValue(this.locators.minPriceInputField, price.toString());
    }

    async setMaxPrice(price: number): Promise<void> {
        await this.setValue(this.locators.maxPriceInputField, price.toString());
    }

    async clickOnApplyFilterButton(): Promise<void> {
        await this.click(this.locators.applyFilterButton);
    }

    async clickOnCloseFilterBitton(): Promise<void> {
        await this.click(this.locators.closeFilterButton);
    }

    async filterByPrice(minPrice?: number, maxPrice?: number): Promise<void> {
        await this.clickOnFilterIcon();
        if (minPrice === undefined && maxPrice === undefined) await this.clickOnCloseFilterBitton();
        if (minPrice !== undefined)
            await this.setMinPrice(minPrice);
        if (maxPrice !== undefined)
            await this.setMaxPrice(maxPrice);
        await this.clickOnApplyFilterButton();
    }

    async validateFilteredProducts(minPrice: number, maxPrice: number, noOfProducts: number = 6): Promise<boolean> {
        let isValidFilter: boolean = true;
        await this.waitForDisplayed(this.locators.filterIcon);

        const noOfSwipe: number = noOfProducts - 1;
        let priceList: number[] = [];

        for (let i = 0; i < noOfSwipe; i++) {
            const allproductsElements = await this.getElements(this.locators.productPrice);
            for (const productEle of allproductsElements) {
                const price = parseFloat(await this.getText(productEle));
                if (price < minPrice || price > maxPrice) {
                    isValidFilter = false;
                    LOGGER.error(`Price-${price} is not between ${minPrice} and ${maxPrice} range.`);
                    break;
                }
                if (priceList.indexOf(price) === -1) priceList.push(price);
            }
            await this.swipeUtil.swipe();
        }

        return isValidFilter;
    }
}