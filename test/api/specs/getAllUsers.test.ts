import { LoggerHelper } from "../../../utils/reporting/LoggerHelper";

import { GetProductsResponseBody } from "../models/response/product/getProducts.response";
import { expect } from "chai";
import { ProductService } from "../services/product.service";
import { SignUpRequestBody } from "../models/request/signUp.request";
import { AuthService } from "../services/auth.service";
import { SignUpResponseBody } from "../models/response/signUp.response";

let productService: ProductService;
let authService: AuthService;

const specName: string = "Get products";
describe("Get products", () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        productService = new ProductService();
        authService = new AuthService();
    });

    it("Should be able to sign-up", async () => {
        const signUpRequestBody: SignUpRequestBody = {
            email: "dharun111115@gmail.com",
            password: "123456"
        };

        const response: SignUpResponseBody = await authService.signUp(signUpRequestBody);

        expect(response.statusCode).to.be.equal(201);
        expect(response.data.user.email).to.be.equal(signUpRequestBody.email);
    });

    it("Should get product list", async () => {
        const accessToken: string = "eyJhbGciOiJIUzI1NiIsImtpZCI6ImV3UjBaUnlOMG5IRHE0RzYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEwMTc3MDkzLCJpYXQiOjE3MTAxNzM0OTMsImlzcyI6Imh0dHBzOi8vbmFxbWh2ZnNkaGlnZXN2cnJqY2wuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImE5MmE4YmU2LWM4YmMtNDg5My04NWM4LTk2NmQ5N2JhNDQ5YSIsImVtYWlsIjoiYWJjMTcxMDE3MzQ5MzA0N0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMDE3MzQ5M31dLCJzZXNzaW9uX2lkIjoiZjhiZGE5YmYtZDJmMi00YTNiLWI0NmEtMDc3ZWIyYWJkOTgwIn0.o0QvzFup3cohddTo_pq-Rt2dErN7krSKEoCvn2sedrs";

        const res: GetProductsResponseBody = await productService.getProducts(accessToken);

        expect(res.statusCode).to.be.equal(200);
    });
});