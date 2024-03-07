import { FileUtil } from "../../utils/file/FileUtil";
import { LoggerHelper } from "../../utils/reporting/LoggerHelper";
import { LoginUtils } from "../commonFunctions/LoginUtils";
import { LoginDetails } from "../resources/customTypes/LoginDetails";
import * as loginDetailsJson from "./../resources/testdata/loginDetails.json";

let loginUtils: LoginUtils;

const specName: string = "Login tests";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginUtils = new LoginUtils();
    });

    it("Should login successfully", async () => {
        const loginDetails: LoginDetails = FileUtil.convertJsonToCustomType(loginDetailsJson);
        const otp: string = "0000";

        await loginUtils.login(loginDetails.email, loginDetails.password, otp);
    });
});