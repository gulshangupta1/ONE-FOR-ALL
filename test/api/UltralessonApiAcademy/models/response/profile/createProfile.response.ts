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

export const createProfileResponseSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "created_at": {
            "type": "string"
        },
        "first_name": {
            "type": "string"
        },
        "last_name": {
            "type": "string"
        },
        "address": {
            "type": "string"
        },
        "mobile_number": {
            "type": "string"
        },
        "user_id": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "created_at",
        "first_name",
        "last_name",
        "address",
        "mobile_number",
        "user_id"
    ]
}