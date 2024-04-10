import { BaseResponse } from "../../base.response";

export interface GetCartResponseBody extends BaseResponse {
    cart_id: string,
    user_id: string,
    created_at: string
}

export const getCartResponseSchema = {
    "type": "object",
    "properties": {
        "cart_id": {
            "type": "string"
        },
        "user_id": {
            "type": "string"
        },
        "created_at": {
            "type": "string"
        }
    },
    "required": [
        "cart_id",
        "user_id",
        "created_at"
    ]
}