import { LOGGER } from "../../../utils/reporting/LoggerHelper";
import { CreateCartResponseBody } from "../models/response/cart/createCart.response";
import { BaseService } from "./base.service";
import axios from "axios";

export class CartService extends BaseService {
    async createCart(accessToken: string): Promise<CreateCartResponseBody> {
        const url: string = `${this.getBaseUrl()}/api/cart`;
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
}