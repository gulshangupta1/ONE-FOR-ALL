import { LoggerHelper } from "../../utils/reporting/LoggerHelper";
import { HomeScreen } from "../screens/HomeScreen";

let homeScreen: HomeScreen;

const specName: string = "Open webview";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
    });

    it('swipe', async () => {
        await homeScreen.clickOnExploreMoreButton(HomeScreen.sectionType.bestSellers);
    });
});