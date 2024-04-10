import { BaseResponse } from "../../base.response";

export interface MakePaymentResponseBody extends BaseResponse {
    message: string,
    amount_paid: string
}

export const makePaymentResponseSchema = {
    "type": "object",
    "properties": {
        "message": {
            "type": "string"
        },
        "amount_paid": {
            "type": "number"
        }
    },
    "required": [
        "message",
        "amount_paid"
    ]
}