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

const specName: string = "Get products";
describe("Get products", () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        authService = new AuthService();
        randomUtil = new RandomUtil();
    });

    it.only("Should be able to sign-up", async () => {
        const signUpRequestBody: SignUpRequestBody = {
            email: randomUtil.getRandomGmail().toLowerCase(),
            password: randomUtil.getRandomPassword(6)
        };
        const signUpResponseBody: SignUpResponseBody = await authService.signUp(signUpRequestBody);
        expect(signUpResponseBody.status).to.be.equal(201);
        expect(signUpResponseBody.data.user.email).to.be.equal(signUpRequestBody.email);
        expect(signUpResponseBody.data.user.id).not.null;
        expect(signUpResponseBody.data.session.access_token).not.null;
    });

    it("Should be able to login", async () => {
        // sign-up
        const signUpRequestBody: SignUpRequestBody = {
            email: randomUtil.getRandomGmail().toLowerCase(),
            password: randomUtil.getRandomPassword(6)
        };
        const signUpResponseBody: SignUpResponseBody = await authService.signUp(signUpRequestBody);
        expect(signUpResponseBody.status).to.be.equal(201);

        // login
        const loginRequestBody: LoginRequestBody = {
            email: signUpRequestBody.email,
            password: signUpRequestBody.password
        };
        const loginResponseBody: LoginResponseBody = await authService.login(loginRequestBody);
        expect(loginResponseBody.status).to.be.equal(200);
        expect(loginResponseBody.data.user.email).to.be.equal(signUpRequestBody.email);
        expect(loginResponseBody.data.session.access_token).not.null;
    });

    // it.skip("Should get product list", async () => {
    //     const accessToken: string = "eyJhbGciOiJIUzI1NiIsImtpZCI6ImV3UjBaUnlOMG5IRHE0RzYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEwMTc3MDkzLCJpYXQiOjE3MTAxNzM0OTMsImlzcyI6Imh0dHBzOi8vbmFxbWh2ZnNkaGlnZXN2cnJqY2wuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImE5MmE4YmU2LWM4YmMtNDg5My04NWM4LTk2NmQ5N2JhNDQ5YSIsImVtYWlsIjoiYWJjMTcxMDE3MzQ5MzA0N0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMDE3MzQ5M31dLCJzZXNzaW9uX2lkIjoiZjhiZGE5YmYtZDJmMi00YTNiLWI0NmEtMDc3ZWIyYWJkOTgwIn0.o0QvzFup3cohddTo_pq-Rt2dErN7krSKEoCvn2sedrs";

    //     const res: GetProductsResponseBody = await productService.getProducts(accessToken);
    //     expect(res.status).to.be.equal(200);
    // });
});