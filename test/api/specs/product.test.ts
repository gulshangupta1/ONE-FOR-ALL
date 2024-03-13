import { RandomUtil } from "../../../utils/common/randomUtil";
import { LoggerHelper } from "../../../utils/reporting/LoggerHelper";
import { SignUpRequestBody } from "../models/request/auth/signUp.request";
import { SignUpResponseBody } from "../models/response/auth/signUp.response";
import { GetProductsResponseBody } from "../models/response/product/getProducts.response";
import { AuthService } from "../services/auth.service";
import { ProductService } from "../services/product.service";
import { expect } from "chai";

let randomUtil: RandomUtil;
let authService: AuthService;
let productService: ProductService;

const specName: string = "Product tests";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        randomUtil = new RandomUtil();
        authService = new AuthService();
        productService = new ProductService();
    })

    it("Should be able to get all product details", async () => {
        const signUpRequestBody: SignUpRequestBody = {
            email: randomUtil.getRandomGmail().toLowerCase(),
            password: randomUtil.getRandomPassword(6)
        }
        const signUpResponseBody: SignUpResponseBody = await authService.signUp(signUpRequestBody);
        expect(signUpResponseBody.status).to.be.equal(201);

        const getProductsResponseBody: GetProductsResponseBody =
            await productService.getProducts(signUpResponseBody.data.session.access_token);

        expect(getProductsResponseBody.status, "Invalid status code").to.be.equal(200);
        expect(getProductsResponseBody.statusText, "Invalid status text").to.be.equal("OK");
        expect(getProductsResponseBody.products.length, "Products length should be 20").to.be.equal(20);
    });

    it.skip("Should be able to get product details by id", async () => {

    });
});