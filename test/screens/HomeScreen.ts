import { XpathUtil } from "../../utils/common/XpathUtil";
import { LOGGER } from "../../utils/reporting/LoggerHelper";
import { BaseScreen } from "./base/BaseScreen";

export class HomeScreen extends BaseScreen {
    constructor() {
        super();
    }

    private locators = {
        bagIcon: "id:com.ultralesson.ulshopify:id/img-shopping-bag",
        bestSellersTitle: "//android.widget.TextView[@text='Best Sellers']",
        categorySectionStatic: "//android.widget.TextView[@text='Clothing']/parent::*/parent::*",
        category: "//android.widget.TextView[@text='##PLACEHOLDER##']",
        productsSectionDynamic: "(//android.widget.TextView[@text='##PLACEHOLDER##']/parent::*/parent::*/child::*)[3]",
        exploreMoreButton: "id:com.ultralesson.ulshopify:id/icon-plus-circle",
        footer: "id:com.ultralesson.ulshopify:id/txt-footer",
    };

    static sectionType = {
        newArrivals: "New Arrivals",
        trendingProducts: "Trending Products",
        topRatedProducts: "Top-Rated Products",
        bestSellers: "Best Sellers"
    };

    static categoryType = {
        clothing: "Clothing",
        shoes: "Shoes",
        furniture: "Furniture",
        toys: "Toys",
        audioSets: "Audio sets",
        books: "Books"
    };

    async clickOnBagIcon(): Promise<void> {
        await this.click(this.locators.bagIcon);
    }

    async clickOnExploreMoreButton(sectionType: string): Promise<void> {
        try {
            await this.waitForDisplayed(this.locators.bagIcon);
            switch (sectionType) {
                case HomeScreen.sectionType.newArrivals:
                    await this.swipeHorizontalOnSectionTillElement(XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType), this.locators.exploreMoreButton);
                    break;
                case HomeScreen.sectionType.trendingProducts:
                    await this.swipeHorizontalOnSectionTillElement(XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType), this.locators.exploreMoreButton);
                    break;
                case HomeScreen.sectionType.topRatedProducts:
                    await this.swipeTillElement(this.locators.bestSellersTitle);
                    await this.swipeHorizontalOnSectionTillElement(XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType), this.locators.exploreMoreButton);
                    break;
                case HomeScreen.sectionType.bestSellers:
                    await this.swipeTillElement(this.locators.footer);
                    await this.swipeHorizontalOnSectionTillElement(XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType), this.locators.exploreMoreButton);
                    break;
                default: throw new Error(`Invalid Section: ${sectionType}.`);
            }
            await this.click(this.locators.exploreMoreButton);
        } catch (err) {
            LOGGER.error(`Error while clicking on explore more buttton`);
            throw err;
        }
    }

    async clickOnCategory(categoryType: string): Promise<void> {
        await this.waitForDisplayed(this.locators.bagIcon);
        switch (categoryType) {
            case HomeScreen.categoryType.clothing:
                await this.swipeHorizontalOnSectionTillElement(this.locators.categorySectionStatic, XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType));
                break;
            case HomeScreen.categoryType.shoes:
                await this.swipeHorizontalOnSectionTillElement(this.locators.categorySectionStatic, XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType));
                break;
            case HomeScreen.categoryType.furniture:
                await this.swipeHorizontalOnSectionTillElement(this.locators.categorySectionStatic, XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType));
                break;
            case HomeScreen.categoryType.toys:
                await this.swipeHorizontalOnSectionTillElement(this.locators.categorySectionStatic, XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType));
                break;
            case HomeScreen.categoryType.audioSets:
                await this.swipeHorizontalOnSectionTillElement(this.locators.categorySectionStatic, XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType));
                break;
            case HomeScreen.categoryType.books:
                await this.swipeHorizontalOnSectionTillElement(this.locators.categorySectionStatic, XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType));
                break;
            default: throw new Error(`Invalid Section: ${categoryType}.`);
        }
        await this.click(XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType));
    }
}