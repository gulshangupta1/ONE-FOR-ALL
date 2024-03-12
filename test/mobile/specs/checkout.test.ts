import { FileUtil } from "../../../utils/file/FileUtil";
import { LoggerHelper } from "../../../utils/reporting/LoggerHelper";
import { HomeScreenUtils } from "../commonFunctions/HomeScreenUtils";
import { LoginUtils } from "../commonFunctions/LoginUtils";
import { LoginDetails } from "../resources/customTypes/LoginDetails";
import { Product, ProductDetails } from "../resources/customTypes/ProductDetails";
import { HomeScreen } from "../screens/HomeScreen";
import { MyCartScreen } from "../screens/MyCartScreen";
import { ProductScreen } from "../screens/ProductScreen";
import * as loginDetailsJson from "./../resources/testdata/loginDetails.json";
import * as newArrivalsJson from "./../resources/testdata/new-arrivals.json";

let loginUtils: LoginUtils;
let homeScreenUtils: HomeScreenUtils;
let productScreen: ProductScreen;
let myCartScreen: MyCartScreen;
let homeScreen: HomeScreen;

const specName: string = "e2e test for checkout";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginUtils = new LoginUtils();
        homeScreenUtils = new HomeScreenUtils();
        productScreen = new ProductScreen();
        myCartScreen = new MyCartScreen();
        homeScreen = new HomeScreen();
    });

    it("Search perticular product by name and checkout", async () => {
        const loginDetails: LoginDetails = FileUtil.convertJsonToCustomType(loginDetailsJson);
        const otp = "0000";
        const newArrivalsProducts: ProductDetails = FileUtil.convertJsonToCustomType(newArrivalsJson);
        const productDetails: Product = newArrivalsProducts.products[0];

        await loginUtils.login(loginDetails, otp);
        await homeScreenUtils.searchAndSelectProductByName(productDetails.name);
        await productScreen.validateProductScreen(productDetails);
        await productScreen.clickAddToCartButton();
        await productScreen.clickGoToCartButton();
        await myCartScreen.validateMyCartScreen([productDetails]);
        await myCartScreen.clickPlaceOrderButton();
        await myCartScreen.clickContinueShoppingButton();
        await homeScreen.validateHeader(loginDetails.username);
    });
});