import { AddItemRequestBody } from "../models/request/cartItem/addItem.resuest";
import { AddItemResponseBody } from "../models/response/cartItem/addItem.response";
import { UpdateItemResponseBody } from "../models/response/cartItem/updateItem.response";
import { BaseService } from "./base.service";
import axios from "axios";

export class CartItemService extends BaseService {
    async addItem(accessToken: string, cartId: string, body: AddItemRequestBody): Promise<AddItemResponseBody> {
        const url: string = `${this.getBaseUrl()}/api/cart/${cartId}/items`;
        const token: string = `Bearer ${accessToken}`;

        const response = await axios.post(url, body, {
            headers: { "Authorization": token }
        });

        const addItemResponseBody: AddItemResponseBody = response.data as AddItemResponseBody;
        addItemResponseBody.status = response.status;
        addItemResponseBody.statusText = response.statusText;

        return addItemResponseBody;
    }

    async updateCartItem(accessToken: string, cartId: string, cartItemId: string, body: AddItemRequestBody): Promise<UpdateItemResponseBody> {
        const url: string = `${this.getBaseUrl()}/api/cart/${cartId}/items/${cartItemId}`;
        const token: string = `Bearer ${accessToken}`;

        const response = await axios.put(url, body, {
            headers: { "Authorization": token }
        });

        const updateItemResponseBody: UpdateItemResponseBody = response.data as AddItemResponseBody;
        updateItemResponseBody.status = response.status;
        updateItemResponseBody.statusText = response.statusText;

        return updateItemResponseBody;
    }
}