import { XpathUtil } from "../../utils/common/XpathUtil";
import { LOGGER } from "../../utils/reporting/LoggerHelper";
import { BaseScreen } from "./base/BaseScreen";
import { expect } from "chai";

export class HomeScreen extends BaseScreen {
    constructor() {
        super();
    }

    private locators = {
        browseAndBuyHeadText: "#txt-browse-and-buy",
        bagIcon: "#img-shopping-bag",
        welcomeBackText: "#txt-welcome-back",
        userNameHeadText: "//android.widget.TextView[@text='##PLACEHOLDER##']",
        ultralessonLogo: "#img-ultralesson-logo",
        searchField: "#txt-search-for-more",
        exploreSearchButton: "//android.widget.EditText[@text='Explore']",
        sectionTitle: "//android.widget.TextView[@text='##PLACEHOLDER##']",
        categorySectionByName: "//android.widget.TextView[@text='##PLACEHOLDER##']/parent::*/parent::*",
        category: "//android.widget.TextView[@text='##PLACEHOLDER##']",
        productsSectionDynamic: "(//android.widget.TextView[@text='##PLACEHOLDER##']/parent::*/parent::*/child::*)[3]",
        exploreMoreButton: "#icon-plus-circle",
        footer: "#txt-footer",
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

    async clickOnUlLogo(): Promise<void> {
        await this.click(this.locators.ultralessonLogo);
    }

    async clickOnSearchButton(): Promise<void> {
        await this.click(this.locators.searchField);
        await this.click(this.locators.exploreSearchButton);
        expect(await driver.isKeyboardShown()).to.be.true;
    }

    async searchProduct(productName: string): Promise<void> {
        await this.waitForDisplayed(this.locators.bagIcon);
        await this.clickOnSearchButton();
        await this.setValue(this.locators.exploreSearchButton, productName);
        await driver.hideKeyboard();
    }

    async clickOnExploreMoreButton(sectionType: string): Promise<void> {
        try {
            await this.waitForDisplayed(this.locators.bagIcon);
            switch (sectionType) {
                case HomeScreen.sectionType.newArrivals:
                    await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType),
                        this.locators.exploreMoreButton
                    );
                    break;
                case HomeScreen.sectionType.trendingProducts:
                    await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, sectionType));
                    await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType),
                        this.locators.exploreMoreButton
                    );
                    break;
                case HomeScreen.sectionType.topRatedProducts:
                    await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, sectionType));
                    await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType),
                        this.locators.exploreMoreButton
                    );
                    break;
                case HomeScreen.sectionType.bestSellers:
                    await this.swipeTillElement(this.locators.footer);
                    await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType),
                        this.locators.exploreMoreButton
                    );
                    break;
                default: throw new Error(`Invalid Section: ${sectionType}.`);
            }
            await this.click(this.locators.exploreMoreButton);
        } catch (err) {
            LOGGER.error(`Error while clicking on explore more buttton`);
            throw err;
        }
    }

    async swipeInCategoryTill(categoryType: string): Promise<boolean> {
        try {
            await this.waitForDisplayed(this.locators.bagIcon);
            let isCategoryFound: boolean = false;
            switch (categoryType) {
                case HomeScreen.categoryType.clothing:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, categoryType),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case HomeScreen.categoryType.shoes:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, categoryType),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case HomeScreen.categoryType.furniture:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, categoryType),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case HomeScreen.categoryType.toys:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, categoryType),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case HomeScreen.categoryType.audioSets:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, HomeScreen.categoryType.furniture),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case HomeScreen.categoryType.books:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, categoryType),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                default: throw new Error(`Invalid Section: ${categoryType}.`);
            }

            return isCategoryFound;
        } catch (err) {
            LOGGER.error(`Error while swiping on category.\n${err.stack}`);
            throw err;
        }
    }

    async swipeInCategoryLTR(): Promise<boolean> {
        return await this.swipeHorizontalInSectionTillElement(
            XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, HomeScreen.categoryType.toys),
            XpathUtil.getPlaceholderReplaced(this.locators.category, HomeScreen.categoryType.clothing),
            3,
            true
        );
    }

    async swipeUpTillCategory(): Promise<boolean> {
        const category =
            await this.isDisplayed(XpathUtil.getPlaceholderReplaced(this.locators.category, HomeScreen.categoryType.clothing))
                ? HomeScreen.categoryType.clothing
                : HomeScreen.categoryType.books;
        return await this.swipeTillElement(category, 3, true);
    }

    async clickOnCategory(category: string) {
        try {
            await this.swipeInCategoryTill(category);
            await this.click(this.locators.category);
        } catch (err) {
            LOGGER.error(`Error while clicking on category: ${category}\n${err.stack}`);
            throw err;
        }
    }

    async validateHeader(username?: string): Promise<void> {
        await this.waitForDisplayed(this.locators.browseAndBuyHeadText);
        await this.waitForDisplayed(this.locators.bagIcon);
        if (username !== undefined) await this.waitForDisplayed(XpathUtil.getPlaceholderReplaced(this.locators.userNameHeadText, username));
        else await this.waitForDisplayed(this.locators.welcomeBackText);
        await this.waitForDisplayed(this.locators.ultralessonLogo);
    }

    async validateHomeScreen(username?: string): Promise<void> {
        await this.validateHeader(username);
        // Validating all category should display
        expect(await this.swipeInCategoryTill(HomeScreen.categoryType.clothing)).to.be.true;
        expect(await this.swipeInCategoryTill(HomeScreen.categoryType.shoes)).to.be.true;
        expect(await this.swipeInCategoryTill(HomeScreen.categoryType.furniture)).to.be.true;
        expect(await this.swipeInCategoryTill(HomeScreen.categoryType.toys)).to.be.true;
        expect(await this.swipeInCategoryTill(HomeScreen.categoryType.audioSets)).to.be.true;
        expect(await this.swipeInCategoryTill(HomeScreen.categoryType.books)).to.be.true;
        // Validating all section should display
        expect(await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, HomeScreen.sectionType.newArrivals))).to.be.true;
        expect(await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, HomeScreen.sectionType.trendingProducts))).to.be.true;
        expect(await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, HomeScreen.sectionType.topRatedProducts))).to.be.true;
        expect(await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, HomeScreen.sectionType.bestSellers))).to.be.true;
    }
}