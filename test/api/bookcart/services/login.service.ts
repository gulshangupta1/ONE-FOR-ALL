import axios from "axios";
import { BaseService } from "./base.service";
import { LoginRequestBody } from "./../models/request/login.request";
import { LoginResponseBody } from "../models/response/login.response";

export class LoginService extends BaseService {
    async login(body: LoginRequestBody): Promise<LoginResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().login}`;

        const response = await axios.post(url, body, this.axiosRequestConfig);

        return {
            ...response.data,
            status: response.status,
            statusText: response.statusText
        } as LoginResponseBody;
    }
}