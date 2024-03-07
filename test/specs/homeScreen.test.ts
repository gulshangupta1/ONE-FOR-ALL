import { SwitchContextUtils } from "../../utils/actions/SwitchContextUtils";
import { LoggerHelper } from "../../utils/reporting/LoggerHelper";
import { HomeScreen } from "../screens/HomeScreen";
import { WebviewScreen } from "../screens/WebviewScreen";
import { Product } from "../resources/customTypes/ProductDetails";
import { SearchScreen } from "../screens/SearchScreen";
import { CategoryType } from "../resources/customTypes/enums";
import { FilterProductsUtils } from "../commonFunctions/FilterProductsUtils";

let homeScreen: HomeScreen;
let switchContextUtils: SwitchContextUtils;
let webviewScreen: WebviewScreen;
let searchScreen: SearchScreen;
let filterProductsUtils: FilterProductsUtils;

const specName: string = "Homescreen tests";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
        switchContextUtils = new SwitchContextUtils();
        webviewScreen = new WebviewScreen();
        searchScreen = new SearchScreen();
        filterProductsUtils = new FilterProductsUtils();
    });

    afterEach(async () => {
        const packageName: string = await driver.getCurrentPackage();
        await driver.terminateApp(packageName);
        await driver.activateApp(packageName);
    });

    // TC_1
    it('Verify that header section is displayed correctly on the homescreen', async () => {
        await homeScreen.validateHeader();
    });

    // TC_2, TC_3
    it('Verify that clicking on the bag icon it redirects to the WEBVIEW screen', async () => {
        await homeScreen.clickOnBagIcon();
        await switchContextUtils.switchToWebContext();
        await webviewScreen.validateWebviewScreen();
        await webviewScreen.clickOnBackButton();
        await switchContextUtils.switchToNativeContext();
        await homeScreen.validateHeader();
    });

    // TC_4
    it('Verify that no action should happen if user clicks on Ultralesson logo in homescren header', async () => {
        await homeScreen.validateHomeScreen();
        await homeScreen.swipeUpTillCategory();
        await homeScreen.swipeInCategoryLTR();
        await homeScreen.clickOnUlLogo();
        await homeScreen.validateHomeScreen();
    });

    it('Verify that serch box is functioning properly', async () => {
        await homeScreen.validateHeader();
        await homeScreen.clickOnSearchButton();
    });

    it('Verify that auto-suggestion is showing for produts', async () => {
        const productCategory = CategoryType.Shoes;
        let allShouesProducts: Product[] = filterProductsUtils.filterProductByCategory(productCategory);

        await homeScreen.searchProduct(productCategory);
        await searchScreen.clickOnMoreButton();
        await searchScreen.validateProductList(allShouesProducts);
        await searchScreen.clickOnSearchButton();
    });
});