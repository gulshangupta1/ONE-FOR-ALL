import { SwipeUtils } from "../../utils/actions/SwipeUtils";
import { SwitchContextUtils } from "../../utils/actions/SwitchContextUtils";
import { LoggerHelper } from "../../utils/reporting/LoggerHelper";
import { HomeScreen } from "../screens/HomeScreen";
import { WebviewScreen } from "../screens/WebviewScreen";

let homeScreen: HomeScreen;
let switchContextUtils: SwitchContextUtils;
let webviewScreen: WebviewScreen;
let swipeUtils: SwipeUtils;

const specName: string = "Open webview";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
        switchContextUtils = new SwitchContextUtils();
        webviewScreen = new WebviewScreen();
        swipeUtils = new SwipeUtils();
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
    it.only('Verify that no action should happen if user clicks on Ultralesson logo in homescren header', async () => {
        await homeScreen.validateHeader();
        await homeScreen.validateHomeScreen();
        await swipeUtils.swipeUpByPercentage();
        await swipeUtils.swipeUpByPercentage();
        await homeScreen.swipeInCategoryLeftToRight();
        await homeScreen.clickOnUlLogo();
        await homeScreen.validateHomeScreen();
    });
});