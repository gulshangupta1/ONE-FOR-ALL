import { Product } from "../resources/customTypes/ProductDetails";
import { CategoryType } from "../resources/customTypes/enums";
import { FilterScreen } from "../screens/FilterScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { FilterProductsUtils } from "../commonFunctions/FilterProductsUtils";
import { expect } from "chai";

let homeScreen: HomeScreen;
let filterScreen: FilterScreen;
let filterProductsUtils: FilterProductsUtils;

const specName: string = "Filter related tests"
describe(specName, () => {
    before(async () => {
        homeScreen = new HomeScreen();
        filterScreen = new FilterScreen();
        filterProductsUtils = new FilterProductsUtils();
    });

    afterEach(async () => {
        const packageName: string = await driver.getCurrentPackage();
        await driver.terminateApp(packageName);
        await driver.activateApp(packageName);
    });

    it('Visit in clothing category and filter by price (min & max)', async () => {
        const productCategory = CategoryType.Clothing;
        const minPrice: number = 100;
        const maxPrice: number = 500;

        let allMatchingProducts: Product[] = filterProductsUtils.filterProductsByPriceAndCategory(minPrice, maxPrice, productCategory);

        await homeScreen.clickOnCategory(productCategory);
        await filterScreen.filterByPrice(minPrice, maxPrice);
        expect(await filterScreen.validateFilteredProducts(minPrice, maxPrice, allMatchingProducts.length),
            `Products price is not between ${minPrice} and ${maxPrice}`).to.be.true;
    });

    it('Visit in shoes category and filter by price (min & max)', async () => {
        const productCategory = CategoryType.Shoes;
        const minPrice: number = 100;
        const maxPrice: number = 500;

        let allMatchingProducts: Product[] = filterProductsUtils.filterProductsByPriceAndCategory(minPrice, maxPrice, productCategory);

        await homeScreen.clickOnCategory(productCategory);
        await filterScreen.filterByPrice(minPrice, maxPrice);
        expect(await filterScreen.validateFilteredProducts(minPrice, maxPrice, allMatchingProducts.length),
            `Products price is not between ${minPrice} and ${maxPrice}`).to.be.true;
    });

    it('Visit in furniture category and filter by price (min & max)', async () => {
        const productCategory = CategoryType.Furniture;
        const minPrice: number = 99;
        const maxPrice: number = 250;

        let allMatchingProducts: Product[] = filterProductsUtils.filterProductsByPriceAndCategory(minPrice, maxPrice, productCategory);

        await homeScreen.clickOnCategory(productCategory);
        await filterScreen.filterByPrice(minPrice, maxPrice);
        expect(await filterScreen.validateFilteredProducts(minPrice, maxPrice, allMatchingProducts.length),
            `Products price is not between ${minPrice} and ${maxPrice}`).to.be.true;
    });

    it('Visit in toys category and filter by price (min & max)', async () => {
        const productCategory = CategoryType.Toys;
        const minPrice: number = 150;
        const maxPrice: number = 300;

        let allMatchingProducts: Product[] = filterProductsUtils.filterProductsByPriceAndCategory(minPrice, maxPrice, productCategory);

        await homeScreen.clickOnCategory(productCategory);
        await filterScreen.filterByPrice(minPrice, maxPrice);
        expect(await filterScreen.validateFilteredProducts(minPrice, maxPrice, allMatchingProducts.length),
            `Products price is not between ${minPrice} and ${maxPrice}`).to.be.true;
    });

    it('Visit in audio sets category and filter by price (min & max)', async () => {
        const productCategory = CategoryType.AudioSets;
        const minPrice: number = 100;
        const maxPrice: number = 400;

        let allMatchingProducts: Product[] = filterProductsUtils.filterProductsByPriceAndCategory(minPrice, maxPrice, productCategory);

        await homeScreen.clickOnCategory(productCategory);
        await filterScreen.filterByPrice(minPrice, maxPrice);
        expect(await filterScreen.validateFilteredProducts(minPrice, maxPrice, allMatchingProducts.length),
            `Products price is not between ${minPrice} and ${maxPrice}`).to.be.true;
    });

    it('Visit in books category and filter by price (min & max)', async () => {
        const productCategory = CategoryType.Books;
        const minPrice: number = 20;
        const maxPrice: number = 100;

        let allMatchingProducts: Product[] = filterProductsUtils.filterProductsByPriceAndCategory(minPrice, maxPrice, productCategory);

        await homeScreen.clickOnCategory(productCategory);
        await filterScreen.filterByPrice(minPrice, maxPrice);
        expect(await filterScreen.validateFilteredProducts(minPrice, maxPrice, allMatchingProducts.length),
            `Products price is not between ${minPrice} and ${maxPrice}`).to.be.true;
    });
});