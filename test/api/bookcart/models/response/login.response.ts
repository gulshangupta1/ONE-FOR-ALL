import { BaseResponse } from "../../../UltralessonApiAcademy/models/response/base.response";

export interface LoginResponseBody extends BaseResponse {
    token: string,
    userDetails: UserDetails;
}

interface UserDetails {
    userId: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    gender: string,
    userTypeId: number
}