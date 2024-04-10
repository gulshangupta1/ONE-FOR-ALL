import { BaseResponse } from "../../../UltralessonApiAcademy/models/response/base.response";

export interface GetAllAvailableBooksResponseBody extends BaseResponse {
    bookDetals: BookDetails[]
}

export interface BookDetails {
    bookId: number,
    title: string,
    author: string,
    category: string,
    price: number,
    coverFileName: string
}