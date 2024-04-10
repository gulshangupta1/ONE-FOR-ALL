import { BaseResponse } from "../base.response";

export interface DeleteCartResponseBody extends BaseResponse {
    cart_id: string,
    message: string
}

export const deleteCartResponseSchema = {
    "type": "object",
    "properties": {
        "cart_id": {
            "type": "string"
        },
        "message": {
            "type": "string"
        }
    },
    "required": [
        "cart_id",
        "message"
    ]
}