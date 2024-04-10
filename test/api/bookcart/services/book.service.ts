import axios from "axios";
import { BaseService } from "./base.service";

export class BookService extends BaseService {
    async getBookDetails(token: string) {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().book.getAvailableBooks}`;

        this.axiosRequestConfig.headers.Authorization = `Bearer ${token}`;

        const response = await axios.get(url, this.axiosRequestConfig);

        return {
            ...response.data,
        }
    }
}