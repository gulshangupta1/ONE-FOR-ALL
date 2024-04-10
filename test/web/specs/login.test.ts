import { LoggerHelper } from "../../../utils/reporting/LoggerHelper";
import { LoginDetails } from "../resources/customTypes/loginDetails";
import * as loginDetailsJson from "../resources/testdata/loginDetails.json";
import { LoginUtil } from "../commonFunctions/loginUtil";
import { LogoutUtil } from "../commonFunctions/logoutUtil";

let loginPageUtil: LoginUtil;
let logoutUtil: LogoutUtil;

const specName: string = "Register and Login scenarios";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginPageUtil = new LoginUtil();
        logoutUtil = new LogoutUtil();
    });

    it("Registered user should be able to login", async () => {
        const user: LoginDetails = loginDetailsJson as LoginDetails;

        await loginPageUtil.login(user.username, user.password);
        await logoutUtil.logout();
    });
});