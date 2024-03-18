import { RandomUtil } from "../../../utils/common/randomUtil";
import { LoggerHelper } from "../../../utils/reporting/LoggerHelper";
import { SignUpRequestBody } from "../models/request/auth/signUp.request";
import { SignUpResponseBody } from "../models/response/auth/signUp.response";
import { CreateCartResponseBody } from "../models/response/cart/createCart.response";
import { DeleteCartResponseBody } from "../models/response/cart/deleteCart.response";
import { GetCartResponseBody } from "../models/response/cart/getCart.response";
import { AuthService } from "../services/auth.service";
import { CartService } from "../services/cart.service";
import { expect } from "chai";

let accessToken: string;
let authService: AuthService;
let cartService: CartService;
let signUpResponseBody: SignUpResponseBody;
let createCartResponseBody: CreateCartResponseBody;

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
        signUpResponseBody = await authService.signUp(signUpRequestBody);
        accessToken = signUpResponseBody.data.session.access_token;

        createCartResponseBody = await cartService.createCart(accessToken);
    });

    it("Should be able to create a cart", async () => {
        expect(createCartResponseBody.status).to.be.equal(201);
        expect(createCartResponseBody.statusText).to.be.eq("Created");
        expect(createCartResponseBody.cart_id).to.not.be.undefined;
        expect(createCartResponseBody.user_id).to.be.eq
            (signUpResponseBody.data.user.identities[0].user_id);
        expect(createCartResponseBody.created_at).to.not.be.undefined;
    });

    it("Should be able to delete the cart", async () => {
        const cartId: string = createCartResponseBody.cart_id;

        const deleteCartResponseBody: DeleteCartResponseBody =
            await cartService.deleteCart(accessToken, cartId);

        expect(deleteCartResponseBody.status).to.be.eq(200);
        expect(deleteCartResponseBody.statusText).to.be.eq("OK");
        expect(deleteCartResponseBody.cart_id).to.be.eq(cartId);
        expect(deleteCartResponseBody.message).to.be.eq("Cart deleted");
    });

    it("Should be able to get cart", async () => {
        const cartId: string = createCartResponseBody.cart_id;

        const getCartResponseBody: GetCartResponseBody =
            await cartService.getCart(accessToken);

        expect(getCartResponseBody.status).to.be.eq(200);
        expect(getCartResponseBody.statusText).to.be.eq("OK");
        expect(getCartResponseBody.cart_id).to.be.eq(cartId);
        expect(getCartResponseBody.user_id).to.be.eq
            (signUpResponseBody.data.user.identities[0].user_id)
        expect(getCartResponseBody.created_at).to.be.eq(createCartResponseBody.created_at);
    });
});