import { XpathUtil } from "../../utils/common/XpathUtil";
import { LOGGER } from "../../utils/reporting/LoggerHelper";
import { CategoryType, SectionType } from "../resources/customTypes/enums";
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
        profileIcon: "#icon-profile"
    };

    async clickOnBagIcon(): Promise<void> {
        await this.click(this.locators.bagIcon);
    }

    async clickOnUlLogo(): Promise<void> {
        await this.click(this.locators.ultralessonLogo);
    }

    async getUltraLessonLogoEle(): Promise<WebdriverIO.Element> {
        return await this.getElement(this.locators.ultralessonLogo);
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

    async clickProfileIcon(): Promise<void> {
        await this.click(this.locators.profileIcon);
    }

    async clickOnExploreMoreButton(sectionType: SectionType): Promise<void> {
        try {
            await this.waitForDisplayed(this.locators.bagIcon);
            switch (sectionType) {
                case SectionType.NewArrivals:
                    await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType),
                        this.locators.exploreMoreButton
                    );
                    break;
                case SectionType.TrendingProducts:
                    await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, sectionType));
                    await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType),
                        this.locators.exploreMoreButton
                    );
                    break;
                case SectionType.TopRatedProducts:
                    await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, sectionType));
                    await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.productsSectionDynamic, sectionType),
                        this.locators.exploreMoreButton
                    );
                    break;
                case SectionType.BestSellers:
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

    async swipeInCategoryTill(categoryType: CategoryType): Promise<boolean> {
        try {
            await this.waitForDisplayed(this.locators.bagIcon);
            let isCategoryFound: boolean = false;
            switch (categoryType) {
                case CategoryType.Clothing:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, categoryType),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case CategoryType.Shoes:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, categoryType),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case CategoryType.Furniture:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, categoryType),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case CategoryType.Toys:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, categoryType),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case CategoryType.AudioSets:
                    isCategoryFound = await this.swipeHorizontalInSectionTillElement(
                        XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, CategoryType.Furniture),
                        XpathUtil.getPlaceholderReplaced(this.locators.category, categoryType)
                    );
                    break;
                case CategoryType.Books:
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
            XpathUtil.getPlaceholderReplaced(this.locators.categorySectionByName, CategoryType.Toys),
            XpathUtil.getPlaceholderReplaced(this.locators.category, CategoryType.Clothing),
            3,
            true
        );
    }

    async swipeUpTillCategory(): Promise<boolean> {
        const category =
            await this.isDisplayed(XpathUtil.getPlaceholderReplaced(this.locators.category, CategoryType.Clothing))
                ? CategoryType.Clothing
                : CategoryType.Books;
        return await this.swipeTillElement(category, 3, true);
    }

    async clickOnCategory(category: CategoryType) {
        try {
            await this.waitForDisplayed(this.locators.bagIcon);
            // await this.swipeInCategoryTill(category);
            await this.swipeInCategoryTill(category);
            await this.click(XpathUtil.getPlaceholderReplaced(this.locators.category, category));
        } catch (err) {
            LOGGER.error(`Error while clicking on category: ${category}\n${err.stack}`);
            throw err;
        }
    }

    async validateHeader(username?: string): Promise<void> {
        try {
            await this.waitForDisplayed(this.locators.browseAndBuyHeadText);
            await this.waitForDisplayed(this.locators.bagIcon);
            if (username !== undefined)
                await this.waitForDisplayed(XpathUtil.getPlaceholderReplaced(this.locators.userNameHeadText, username));
            else await this.waitForDisplayed(this.locators.welcomeBackText);
            await this.waitForDisplayed(this.locators.ultralessonLogo);
        } catch (err) {
            LOGGER.error(`Error while validating header.\n${err.stack}`);
            throw err;
        }
    }

    async validateHomeScreen(username?: string): Promise<void> {
        // Validate header
        await this.validateHeader(username);
        // Validating all category should display
        expect(await this.swipeInCategoryTill(CategoryType.Clothing), "Clothing category did not displayed.").to.be.true;
        expect(await this.swipeInCategoryTill(CategoryType.Shoes), "Shoes category did not displayed.").to.be.true;
        expect(await this.swipeInCategoryTill(CategoryType.Furniture), "Furniture category did not displayed.").to.be.true;
        expect(await this.swipeInCategoryTill(CategoryType.Toys), "Toys category did not displayed.").to.be.true;
        expect(await this.swipeInCategoryTill(CategoryType.AudioSets), "AudioSets category did not displayed.").to.be.true;
        expect(await this.swipeInCategoryTill(CategoryType.Books), "Books category did not displayed.").to.be.true;
        // Validating all section should display
        expect(await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, SectionType.NewArrivals)),
            "New Arrivals Section did not displayed."
        ).to.be.true;
        expect(await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, SectionType.TrendingProducts)),
            "Trending Products Section did not displayed."
        ).to.be.true;
        expect(await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, SectionType.TopRatedProducts)),
            "Top-Rated Products Section did not displayed."
        ).to.be.true;
        expect(await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.sectionTitle, SectionType.BestSellers)),
            "Best Sellers Products Section did not displayed."
        ).to.be.true;
        // Validate footer
        expect(await this.swipeTillElement(this.locators.footer), "Footer did not displayed").to.be.true;
    }
}