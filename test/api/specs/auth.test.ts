import { LoggerHelper } from "../../../utils/reporting/LoggerHelper";
import { expect } from "chai";
import { SignUpRequestBody } from "../models/request/auth/signUp.request";
import { AuthService } from "../services/auth.service";
import { SignUpResponseBody } from "../models/response/auth/signUp.response";
import { RandomUtil } from "../../../utils/common/randomUtil";
import { LoginRequestBody } from "../models/request/auth/login.request";
import { LoginResponseBody } from "../models/response/auth/login.response";

let authService: AuthService;
let randomUtil: RandomUtil;
let signUpRequestBody: SignUpRequestBody;
let signUpResponseBody: SignUpResponseBody;

const specName: string = "Get products";
describe("Get products", () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        authService = new AuthService();
        randomUtil = new RandomUtil();
    });

    beforeEach(async () => {
        // Sign-Up
        signUpRequestBody = {
            email: randomUtil.getRandomGmail().toLowerCase(),
            password: randomUtil.getRandomPassword(6)
        };

        signUpResponseBody = await authService.signUp(signUpRequestBody);
    });

    it("Should be able to sign-up", async () => {
        expect(signUpResponseBody.status).to.be.equal(201);
        expect(signUpResponseBody.data.user.email).to.be.equal(signUpRequestBody.email);
        expect(signUpResponseBody.data.user.id).not.null;
        expect(signUpResponseBody.data.session.access_token).not.null;
    });

    it("Should be able to login", async () => {
        // Login
        const loginRequestBody: LoginRequestBody = {
            email: signUpRequestBody.email,
            password: signUpRequestBody.password
        };
        const loginResponseBody: LoginResponseBody = await authService.login(loginRequestBody);

        expect(loginResponseBody.status).to.be.equal(200);
        expect(loginResponseBody.data.user.email).to.be.equal(signUpRequestBody.email);
        expect(loginResponseBody.data.session.access_token).not.null;
    });
});