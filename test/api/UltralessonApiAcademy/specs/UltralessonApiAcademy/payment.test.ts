import { ResponseUtil } from "../../../../../utils/api/responseUtil";
import { RandomUtil } from "../../../../../utils/common/randomUtil";
import { LoggerHelper } from "../../../../../utils/reporting/LoggerHelper";
import { SignUpRequestBody } from "../../models/request/UltralessonApiAcademy/auth/signUp.request";
import { AddItemRequestBody } from "../../models/request/UltralessonApiAcademy/cartItem/addItem.resuest";
import { SignUpResponseBody } from "../../models/response/UltralessonApiAcademy/auth/signUp.response";
import { CreateCartResponseBody } from "../../models/response/UltralessonApiAcademy/cart/createCart.response";
import { MakePaymentResponseBody, makePaymentResponseSchema } from "../../models/response/UltralessonApiAcademy/payment/makePayment.response";
import { GetProductsResponseBody, Product } from "../../models/response/UltralessonApiAcademy/product/getProducts.response";
import { AuthService } from "../../services/UltralessonApiAcademy/auth.service";
import { CartItemService } from "../../services/UltralessonApiAcademy/cart.item.service";
import { CartService } from "../../services/UltralessonApiAcademy/cart.service";
import { PaymentService } from "../../services/UltralessonApiAcademy/payment.service";
import { ProductService } from "../../services/UltralessonApiAcademy/product.service";
import { expect } from "chai";

let authService: AuthService;
let cartService: CartService;
let productService: ProductService;
let cartItemService: CartItemService;
let paymentService: PaymentService;

const specName: string = "Payment tests";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        authService = new AuthService();
        cartService = new CartService();
        cartItemService = new CartItemService();
        productService = new ProductService();
        paymentService = new PaymentService();
    });

    it("Should be able to make payment", async () => {
        // Sign-Up
        const signUpRequestBody: SignUpRequestBody = {
            email: RandomUtil.getRandomGmail().toLowerCase(),
            password: RandomUtil.getRandomPassword(6)
        };
        const signUpResponseBody: SignUpResponseBody = await authService.signUp(signUpRequestBody);
        const accessToken: string = signUpResponseBody.data.session.access_token;

        // Create cart
        const createCartResponseBody: CreateCartResponseBody = await cartService.createCart(accessToken);
        const cartId: string = createCartResponseBody.cart_id;

        // Get product
        const limit: number = 4;
        const page: number = 1;
        const getProductsResponseBody: GetProductsResponseBody = await productService.getProducts(accessToken, limit, page);
        const product: Product = getProductsResponseBody.products[0];
        const productId: string = product.id;

        // Adde product to cart
        const quantity = 10;
        const addItemRequestBody: AddItemRequestBody = {
            product_id: productId,
            quantity: quantity
        };
        // const addItemResponseBody: AddItemResponseBody = await cartItemService.addItem(accessToken, cartId, addItemRequestBody);
        await cartItemService.addItem(accessToken, cartId, addItemRequestBody);

        // Make payment
        const makePaymentResponseBody: MakePaymentResponseBody = await paymentService.makePayment(accessToken);

        expect(makePaymentResponseBody.message, "payment success message should be displayed").to.be.eq("payment success");
        expect(makePaymentResponseBody.amount_paid, "Invalid total amount").to.be.eq(product.price * quantity);
        expect(ResponseUtil.isValidateSchema(makePaymentResponseBody, makePaymentResponseSchema), "Invalid schema").to.be.true;
    });
});