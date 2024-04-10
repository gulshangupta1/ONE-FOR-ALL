import axios from "axios";
import { BaseService } from "./base.service";
import { GetAllAvailableBooksResponseBody } from "../models/response/getBookDetails.response";

export class BookService extends BaseService {
    async getBookDetails(token: string): Promise<GetAllAvailableBooksResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().book.getAvailableBooks}`;

        this.axiosRequestConfig.headers.Authorization = `Bearer ${token}`;

        const response = await axios.get(url, this.axiosRequestConfig);

        return {
            ...response.data,
            status: response.status,
            statusText: response.statusText
        } as GetAllAvailableBooksResponseBody;
    }
}