import { RandomUtil } from "../../../utils/common/randomUtil";
import { LoggerHelper } from "../../../utils/reporting/LoggerHelper";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { RegisterPage } from "../pages/resisterPage";
import { Gender } from "../resources/customTypes/bookcartEnumns";
import { RegisterUserData } from "../resources/customTypes/registerData";
import { LoginUtil } from "../commonFunctions/loginUtil";
import { LogoutUtil } from "../commonFunctions/logoutUtil";

let homePage: HomePage;
let loginPage: LoginPage;
let registerPage: RegisterPage;
let loginPageUtil: LoginUtil;
let logoutUtil: LogoutUtil;

const specName: string = "Register and Login scenarios";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homePage = new HomePage();
        loginPage = new LoginPage();
        registerPage = new RegisterPage();
        loginPageUtil = new LoginUtil();
        logoutUtil = new LogoutUtil();
    });

    it("User should be able to register and login successfully", async () => {
        const user: RegisterUserData = {
            firstName: RandomUtil.getRandomFirstName(),
            lastName: RandomUtil.getRandomLastName(),
            userName: RandomUtil.getRandomUserName(),
            password: RandomUtil.getRandomPassword(8) + "aA1!",
            gender: Gender.Male
        };

        await homePage.clickLoginButton();
        await loginPage.clickRegisterButton();
        await registerPage.enterUserDetails(user);

        await loginPageUtil.login(user.userName, user.password);
        await logoutUtil.logout();
    });
});