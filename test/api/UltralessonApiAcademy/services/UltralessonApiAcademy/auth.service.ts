import { LoginRequestBody } from "../../models/request/UltralessonApiAcademy/auth/login.request";
import { SignUpRequestBody } from "../../models/request/UltralessonApiAcademy/auth/signUp.request";
import { LoginResponseBody } from "../../models/response/UltralessonApiAcademy/auth/login.response";
import { SignUpResponseBody } from "../../models/response/UltralessonApiAcademy/auth/signUp.response";
import { BaseService } from "./base.service";
import axios, { AxiosResponse } from "axios";

export class AuthService extends BaseService {
    async signUp(body: SignUpRequestBody): Promise<SignUpResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().auth.signUp}`;

        const response: AxiosResponse<any, any> = await axios.post(url, body);

        const signUpResponseBody: SignUpResponseBody = response.data;
        signUpResponseBody.status = response.status;
        signUpResponseBody.statusText = response.statusText;

        return signUpResponseBody;
    }

    async login(body: LoginRequestBody): Promise<LoginResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().auth.login}`;

        const response: AxiosResponse<any, any> = await axios.post(url, body);

        const loginResponseBody: LoginResponseBody = response.data;
        loginResponseBody.status = response.status;
        loginResponseBody.statusText = response.statusText;

        return loginResponseBody;
    }
}