import { SwitchContextUtils } from "../../utils/actions/SwitchContextUtils";
import { FileUtil } from "../../utils/file/FileUtil";
import { LoggerHelper } from "../../utils/reporting/LoggerHelper";
import { HomeScreen } from "../screens/HomeScreen";
import { WebviewScreen } from "../screens/WebviewScreen";
import * as bestSellersJson from "../resources/testdata/best-sellers.json";
import { Product } from "../resources/customTypes/ProductDetails";
import * as newArrivalsJson from "../resources/testdata/new-arrivals.json";
import * as topRatedProductsJson from "../resources/testdata/top-rated-products.json";
import * as trendingProductsJson from "../resources/testdata/trending-products.json";
import { SearchScreen } from "../screens/SearchScreen";
import { ProductDetails } from "../resources/customTypes/ProductDetails";

let homeScreen: HomeScreen;
let switchContextUtils: SwitchContextUtils;
let webviewScreen: WebviewScreen;
let searchScreen: SearchScreen;

const specName: string = "Homescreen tests";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
        switchContextUtils = new SwitchContextUtils();
        webviewScreen = new WebviewScreen();
        searchScreen = new SearchScreen();
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

    it.only('Verify that auto-suggestion is showing for produts', async () => {
        const productCategory: string = HomeScreen.categoryType.shoes;

        let allProducts: ProductDetails[] = [];
        allProducts.push(FileUtil.convertJsonToCustomType(bestSellersJson));
        allProducts.push(FileUtil.convertJsonToCustomType(newArrivalsJson));
        allProducts.push(FileUtil.convertJsonToCustomType(topRatedProductsJson));
        allProducts.push(FileUtil.convertJsonToCustomType(trendingProductsJson));

        let allShouesProducts: Product[] = [];
        allProducts.filter((productDetails) => {
            productDetails.products.filter((product) => {
                if (product.category.toLowerCase() === productCategory.toLowerCase())
                    allShouesProducts.push(product);
            });
        });

        await homeScreen.searchProduct(productCategory);
        await searchScreen.clickOnMoreButton();
        await searchScreen.validateProductList(allShouesProducts);
        await searchScreen.clickOnSearchButton();
    });
});