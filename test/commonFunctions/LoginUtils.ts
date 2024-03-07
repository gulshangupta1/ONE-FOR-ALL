import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { OtpScreen } from "../screens/OtpScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { BaseScreen } from "../screens/base/BaseScreen"

export class LoginUtils extends BaseScreen {
    welcomeScreen: WelcomeScreen;
    loginScreen: LoginScreen;
    otpScreen: OtpScreen;
    homeScreen: HomeScreen;

    constructor() {
        super();
        this.welcomeScreen = new WelcomeScreen;
        this.loginScreen = new LoginScreen();
        this.otpScreen = new OtpScreen();
        this.homeScreen = new HomeScreen();
    }

    async login(email: string, password: string, otp: string) {
        await this.homeScreen.clickProfileIcon();
        await this.welcomeScreen.clickLoginButton();
        await this.loginScreen.enterLoginDetails(email, password);
        await this.loginScreen.clickLoginButton();
        await this.otpScreen.enterOtp(otp);
        await this.otpScreen.clickVerifyButton();
        await this.waitForDisplayed(await this.homeScreen.getUltraLessonLogoEle());
    }
}