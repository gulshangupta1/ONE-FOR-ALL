import { BaseResponse } from "../base.response";

export interface UpdateProfileResponseBody extends BaseResponse {
    data: Data,
    message: string,
    field_updated: string[]
}

interface Data {
    id: string,
    created_at: string,
    first_name: string,
    last_name: string,
    address: string,
    mobile_number: string,
    user_id: string
}