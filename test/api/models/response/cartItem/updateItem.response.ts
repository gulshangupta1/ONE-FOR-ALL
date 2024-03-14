import { BaseResponse } from "../base.response";

export interface UpdateItemResponseBody extends BaseResponse {
    cart_item_id: string,
    cart_id: string,
    product_id: string,
    quantity: number,
    price: number
}