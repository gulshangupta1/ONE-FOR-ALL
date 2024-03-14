import { BaseResponse } from "../base.response";

export interface CreateProfileResponseBody extends BaseResponse {
    id: string,
    created_at: string,
    first_name: string,
    last_name: string,
    address: string,
    mobile_number: string,
    user_id: string
}