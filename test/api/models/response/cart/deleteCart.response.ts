import { BaseResponse } from "../base.response";

export interface DeleteCartResponseBody extends BaseResponse {
    cart_id: string,
    message: string
}