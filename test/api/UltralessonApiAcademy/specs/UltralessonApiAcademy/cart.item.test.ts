import { ResponseUtil } from "../../../../../utils/api/responseUtil";
import { RandomUtil } from "../../../../../utils/common/randomUtil";
import { LoggerHelper } from "../../../../../utils/reporting/LoggerHelper";
import { SignUpRequestBody } from "../../models/request/UltralessonApiAcademy/auth/signUp.request";
import { AddItemRequestBody } from "../../models/request/UltralessonApiAcademy/cartItem/addItem.resuest";
import { SignUpResponseBody } from "../../models/response/UltralessonApiAcademy/auth/signUp.response";
import { CreateCartResponseBody } from "../../models/response/UltralessonApiAcademy/cart/createCart.response";
import { AddItemResponseBody, addItemResponseSchema } from "../../models/response/UltralessonApiAcademy/cartItem/addItem.response";
import { UpdateItemResponseBody, updateItemResponseSchema } from "../../models/response/UltralessonApiAcademy/cartItem/updateItem.response";
import { GetProductsResponseBody, Product } from "../../models/response/UltralessonApiAcademy/product/getProducts.response";
import { AuthService } from "../../services/UltralessonApiAcademy/auth.service";
import { CartItemService } from "../../services/UltralessonApiAcademy/cart.item.service";
import { CartService } from "../../services/UltralessonApiAcademy/cart.service";
import { ProductService } from "../../services/UltralessonApiAcademy/product.service";
import { expect } from "chai";

let authService: AuthService;
let accessToken: string;
let productService: ProductService;
let cartService: CartService;
let cartItemService: CartItemService;
let getProductsResponseBody: GetProductsResponseBody;
let createCartResponseBody: CreateCartResponseBody;
let product: Product;
let quantity: number;

const specName: string = "Cart item tests";
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        authService = new AuthService();
        productService = new ProductService()
        cartService = new CartService;
        cartItemService = new CartItemService();
    });

    beforeEach(async () => {
        // Sign-Up
        const signUpResquestBody: SignUpRequestBody = {
            email: RandomUtil.getRandomGmail().toLowerCase(),
            password: RandomUtil.getRandomPassword(6)
        }
        const signUpResponseBody: SignUpResponseBody = await authService.signUp(signUpResquestBody);
        accessToken = signUpResponseBody.data.session.access_token;

        // Get product
        const limit: number = 4;
        const page: number = 1;
        getProductsResponseBody = await productService.getProducts(accessToken, limit, page);
        product = getProductsResponseBody.products[0];

        // Create cart
        createCartResponseBody = await cartService.createCart(accessToken);
    });

    it("Should be able to add item to cart", async () => {
        quantity = 10;
        const cartId: string = createCartResponseBody.cart_id;

        // Add product to cart
        const addItemRequestBody: AddItemRequestBody = {
            product_id: product.id,
            quantity: quantity
        };
        const addItemResponseBody: AddItemResponseBody =
            await cartItemService.addItem(accessToken, cartId, addItemRequestBody);

        expect(addItemResponseBody.status).to.be.eq(201);
        expect(addItemResponseBody.statusText).to.be.eq("Created");
        expect(addItemResponseBody.cart_id).to.be.eq(cartId);
        expect(addItemResponseBody.product_id).to.be.eq(product.id);
        expect(addItemResponseBody.quantity).to.be.eq(quantity);
        expect(addItemResponseBody.price).to.be.eq(product.price);
        expect(ResponseUtil.isValidateSchema(addItemResponseBody, addItemResponseSchema), "Invalid schema").to.be.true;
    });

    it("Should be able to update cart item", async () => {
        let quantity: number = 10;
        const cartId: string = createCartResponseBody.cart_id;

        // Add product to cart
        const addItemRequestBody: AddItemRequestBody = {
            product_id: product.id,
            quantity: quantity
        };
        const addItemResponseBody: AddItemResponseBody =
            await cartItemService.addItem(accessToken, cartId, addItemRequestBody);

        // Update cart item
        quantity = 15;
        const cartItemId: string = addItemResponseBody.cart_item_id;
        const updateItemRequestBody: AddItemRequestBody = {
            product_id: product.id,
            quantity: quantity
        };

        const updateItemResponseBody: UpdateItemResponseBody =
            await cartItemService.updateCartItem(accessToken, cartId, cartItemId, updateItemRequestBody);

        expect(updateItemResponseBody.status).to.be.eq(200);
        expect(updateItemResponseBody.statusText).to.be.eq("OK");
        expect(updateItemResponseBody.cart_id).to.be.eq(cartId);
        expect(updateItemResponseBody.product_id).to.be.eq(product.id);
        expect(updateItemResponseBody.quantity).to.be.eq(quantity);
        expect(updateItemResponseBody.price).to.be.eq(product.price);
        expect(ResponseUtil.isValidateSchema(updateItemResponseBody, updateItemResponseSchema), "Invalid schema").to.be.true;
    });
});