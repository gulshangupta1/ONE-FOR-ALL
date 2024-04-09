import { LoggerHelper } from "../../../../utils/reporting/LoggerHelper";
import { DashboardPage } from "../../pages/orangeHrm/dashboardPage";
import { LoginPage } from "../../pages/orangeHrm/loginPage";
import { LoginUser } from "../../resources/customTypes/orangeHrm/loginUser";
import * as loginUserJson from "../../resources/testdata/loginUser.json";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

const specName: string = "Sample tests";
describe.skip(specName, () => {
    before(() => {
        LoggerHelper.setupLogger(specName);
        loginPage = new LoginPage();
        dashboardPage = new DashboardPage();
    });

    it("User should be able to login", async () => {
        const loginUser: LoginUser = loginUserJson as LoginUser;
        await loginPage.login(loginUser.username, loginUser.password);
        await (await dashboardPage.getDashboardHeadEle()).waitForDisplayed();
    });
});