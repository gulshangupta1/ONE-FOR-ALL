import { BaseScreen } from "./base/BaseScreen";

export class OtpScreen extends BaseScreen {
    constructor() {
        super();
    }

    private locators = {
        otpInputField1: "#inp-opt-1",
        otpInputField2: "#inp-opt-2",
        otpInputField3: "#inp-opt-3",
        otpInputField4: "#inp-opt-4",
        verifyButton: "#txt-verify"
    }

    async enterOtp(otp: string) {
        if (otp.length > 4) throw Error(`Invalid OTP`);
        await this.setValue(this.locators.otpInputField1, otp[0]);
        await this.setValue(this.locators.otpInputField2, otp[1]);
        await this.setValue(this.locators.otpInputField3, otp[2]);
        await this.setValue(this.locators.otpInputField4, otp[3]);
        await driver.hideKeyboard();
    }

    async clickVerifyButton() {
        await this.click(this.locators.verifyButton);
    }
}