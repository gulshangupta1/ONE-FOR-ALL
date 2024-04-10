import { LoggerHelper } from "../../../../utils/reporting/LoggerHelper";
import { LoginDetails } from "../../../web/resources/customTypes/bookcart/loginDetails";
import * as loginDetailsJson from "../../../web/resources/testdata/bookcart/loginDetails.json";
import { LoginRequestBody } from "./../models/request/login.request";
import { LoginResponseBody } from "../models/response/login.response";
import { LoginService } from "../services/login.service";

let loginService: LoginService;

const specName: string = 'Get book details scenarios';
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
    });

    it('Should be able to get list of all available book details', async () => {
        const user: LoginDetails = loginDetailsJson as LoginDetails;
        const loginRequestBody: LoginRequestBody = loginDetailsJson as LoginRequestBody;
        const loginResponseBody: LoginResponseBody = await loginService.login(loginRequestBody);
        const token: string = loginResponseBody.token;

        
    });
});