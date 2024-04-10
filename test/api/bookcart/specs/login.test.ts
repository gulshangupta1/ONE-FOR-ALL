import { LoggerHelper } from "../../../../utils/reporting/LoggerHelper";
import { LoginRequestBody } from "./../models/request/login.request";
import { LoginResponseBody } from "../models/response/login.response";
import { LoginService } from "../services/login.service";
import * as loginDetailsJson from "../../../web/resources/testdata/bookcart/loginDetails.json";
import { expect } from "chai";

let loginService: LoginService;

const specName: string = 'Login scenarios';
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginService = new LoginService();
    });

    it('Should be able to login', async () => {
        const loginRequestBody: LoginRequestBody = loginDetailsJson as LoginRequestBody;

        const loginResponseBody: LoginResponseBody = await loginService.login(loginRequestBody);

        expect(loginResponseBody.status).to.be.equal(200);
        expect(loginResponseBody.statusText).to.be.equal('OK');
    });
});