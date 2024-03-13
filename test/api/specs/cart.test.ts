import { RandomUtil } from "../../../utils/common/randomUtil";
import { LoggerHelper } from "../../../utils/reporting/LoggerHelper";
import { SignUpRequestBody } from "../models/request/auth/signUp.request";
import { SignUpResponseBody } from "../models/response/auth/signUp.response";
import { CreateCartResponseBody } from "../models/response/cart/createCart.response";
import { AuthService } from "../services/auth.service";
import { CartService } from "../services/cart.service";
import { expect } from "chai";

let accessToken: string;
let authService: AuthService;
let cartService: CartService;

const specName: string = "Cart tests";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        authService = new AuthService();
        cartService = new CartService();
    });

    beforeEach(async () => {
        const signUpRequestBody: SignUpRequestBody = {
            email: RandomUtil.getRandomGmail().toLowerCase(),
            password: RandomUtil.getRandomPassword()
        };

        const signUpResponseBody: SignUpResponseBody = await authService.signUp(signUpRequestBody);
        accessToken = signUpResponseBody.data.session.access_token;
    });

    it("Should be able to create a cart", async () => {
        const createCartResponseBody: CreateCartResponseBody = await cartService.createCart(accessToken);

        expect(createCartResponseBody.status).to.be.equal(201);
        expect(createCartResponseBody.statusText).to.be.eq("Created");
        expect(createCartResponseBody.cart_id).to.not.be.undefined;
        expect(createCartResponseBody.user_id).to.not.be.undefined;
        expect(createCartResponseBody.created_at).to.not.be.undefined;
    });
});