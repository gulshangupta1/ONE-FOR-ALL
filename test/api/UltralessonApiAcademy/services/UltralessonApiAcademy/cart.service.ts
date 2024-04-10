import { LOGGER } from "../../../../../utils/reporting/LoggerHelper";
import { CreateCartResponseBody } from "../../models/response/UltralessonApiAcademy/cart/createCart.response";
import { DeleteCartResponseBody } from "../../models/response/UltralessonApiAcademy/cart/deleteCart.response";
import { GetCartResponseBody } from "../../models/response/UltralessonApiAcademy/cart/getCart.response";
import { BaseService } from "./base.service";
import axios from "axios";

export class CartService extends BaseService {
    async createCart(accessToken: string): Promise<CreateCartResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().cart.createCart}`;
        const token: string = `Bearer ${accessToken}`;

        try {
            const response = await axios.post(url, {}, {
                headers: { "Authorization": token }
            });

            return {
                ...response.data,
                status: response.status,
                statusText: response.statusText
            } as CreateCartResponseBody
        } catch (err) {
            LOGGER.error(`Error while creating a cart.\n${err.stack}`);
            throw err;
        }
    }

    async deleteCart(accessToken: string, cartId: string): Promise<DeleteCartResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().cart.deleteCart}`.replace("{{CART_ID}}", cartId);
        const token: string = `Bearer ${accessToken}`;

        const response = await axios.delete(url, {
            headers: { "Authorization": token }
        });

        return {
            ...response.data,
            status: response.status,
            statusText: response.statusText
        } as DeleteCartResponseBody;
    }

    async getCart(accessToken: string): Promise<GetCartResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().cart.getCart}`;
        const token: string = `Bearer ${accessToken}`;

        const response = await axios.get(url, {
            headers: { "Authorization": token }
        });

        const getCartResponseBody: GetCartResponseBody = response.data as GetCartResponseBody;
        getCartResponseBody.status = response.status;
        getCartResponseBody.statusText = response.statusText;

        return getCartResponseBody;
    }
}