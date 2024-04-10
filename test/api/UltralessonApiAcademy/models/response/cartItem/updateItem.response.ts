import { BaseResponse } from "../base.response";

export interface UpdateItemResponseBody extends BaseResponse {
    cart_item_id: string,
    cart_id: string,
    product_id: string,
    quantity: number,
    price: number
}

export const updateItemResponseSchema = {
    "type": "object",
    "properties": {
        "cart_item_id": {
            "type": "string"
        },
        "cart_id": {
            "type": "string"
        },
        "product_id": {
            "type": "string"
        },
        "quantity": {
            "type": "number"
        },
        "price": {
            "type": "number"
        }
    },
    "required": [
        "cart_item_id",
        "cart_id",
        "product_id",
        "quantity",
        "price"
    ]
}