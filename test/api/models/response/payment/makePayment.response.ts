import { BaseResponse } from "../base.response";

export interface MakePaymentResponseBody extends BaseResponse {
    message: string,
    amount_paid: string
}