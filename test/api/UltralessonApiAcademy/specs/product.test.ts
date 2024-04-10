import { ResponseUtil } from "../../../../utils/api/responseUtil";
import { RandomUtil } from "../../../../utils/common/randomUtil";
import { LoggerHelper } from "../../../../utils/reporting/LoggerHelper";
import { SignUpRequestBody } from "../models/request/auth/signUp.request";
import { GetProductByIdResponseBody } from "../models/response/product/getProductById.response";
import { GetProductsResponseBody, Product, getProductsResponseSchema, productSchema } from "../models/response/product/getProducts.response";
import { AuthService } from "../services/auth.service";
import { ProductService } from "../services/product.service";
import { expect } from "chai";

let authService: AuthService;
let productService: ProductService;
let signUpRequestBody: SignUpRequestBody
let accessToken: string;

const specName: string = "Product tests";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        authService = new AuthService();
        productService = new ProductService();
    });

    beforeEach(async () => {
        signUpRequestBody = {
            email: RandomUtil.getRandomGmail().toLowerCase(),
            password: RandomUtil.getRandomPassword(6)
        }

        const signUpResponseBody = await authService.signUp(signUpRequestBody);
        accessToken = signUpResponseBody.data.session.access_token;
    });

    it("Should be able to get all product details", async () => {
        const getProductsResponseBody: GetProductsResponseBody = await productService.getProducts(accessToken);

        expect(getProductsResponseBody.status, "Invalid status code").to.be.equal(200);
        expect(getProductsResponseBody.statusText, "Invalid status text").to.be.equal("OK");
        expect(getProductsResponseBody.products.length, "Products length should be 20").to.be.equal(20);
        expect(ResponseUtil.isValidateSchema(getProductsResponseBody, getProductsResponseSchema), "Invalid schema").to.be.true;
    });

    it("Should be able to get product details by id", async () => {
        const getProductsResponseBody: GetProductsResponseBody = await productService.getProducts(accessToken);
        const product: Product = getProductsResponseBody.products.find(product => product.name == "Smartphone");

        const getProductByIdResponseBody: GetProductByIdResponseBody = await productService.getProductById(accessToken, product.id);

        expect(getProductByIdResponseBody.status, "Invalid status code").to.be.equal(200);
        expect(getProductByIdResponseBody.statusText, "Invalid status text").to.be.equal("OK");
        expect(getProductByIdResponseBody.product.id).to.be.equal(product.id);
        expect(getProductByIdResponseBody.product.name).to.be.equal(product.name);
        expect(getProductByIdResponseBody.product.price).to.be.equal(product.price);
        expect(ResponseUtil.isValidateSchema(getProductByIdResponseBody, productSchema), "Invalid schema").to.be.true;
    });

    it("Should be able to get products within limit (limit, page -> query parameter)", async () => {
        const limit: number = 4;
        const page: number = 1;

        const getProductsResponseBody = await productService.getProducts(accessToken, limit, page);

        expect(getProductsResponseBody.status, "Invalid status code").to.be.equal(200);
        expect(getProductsResponseBody.statusText, "Invalid status text").to.be.equal("OK");
        expect(getProductsResponseBody.products.length, "Products length should be 4").to.be.equal(4);
    });
});