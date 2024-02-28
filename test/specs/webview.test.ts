import { SwitchContextUtils } from "../../utils/actions/SwitchContextUtils";
import { LoggerHelper } from "../../utils/reporting/LoggerHelper";
import { HomeScreen } from "../screens/HomeScreen";

const specName: string = "Open webview";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
    });

    it("Switch between native and", async () => {
        const homeScreen: HomeScreen = new HomeScreen();
        await homeScreen.clickBagIcon();
        const switchContextUtils: SwitchContextUtils = new SwitchContextUtils();
        await switchContextUtils.switchToWebContext();
    });
});