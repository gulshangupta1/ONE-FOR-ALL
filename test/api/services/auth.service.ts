import { SignUpRequestBody } from "../models/request/signUp.request";
import { SignUpResponseBody } from "../models/response/signUp.response";
import { BaseService } from "./base.service";
import axios from "axios";

export class AuthService extends BaseService {
    async signUp(body: SignUpRequestBody): Promise<SignUpResponseBody> {
        const url: string = `${this.getBaseUrl()}/api/auth/signup`;

        const response = await axios.post(url, body);

        const signUpResponseBody: SignUpResponseBody = response.data;
        signUpResponseBody.statusCode = response.status;
        signUpResponseBody.statusText = response.statusText;

        return signUpResponseBody;
    }
}