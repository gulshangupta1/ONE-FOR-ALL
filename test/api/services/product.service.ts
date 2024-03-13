import { GetProductsResponseBody } from "../models/response/product/getProducts.response";
import { BaseService } from "./base.service";
import axios, { AxiosResponse } from "axios";

export class ProductService extends BaseService {
    async getProducts(accessToken: string, limit?: number, page?: number) {
        accessToken = `Bearer ${accessToken}`;
        let url = `${this.getBaseUrl()}/api/products`;

        const response: AxiosResponse<any, any> = await axios.get(url, {
            headers: { "Authorization": accessToken },
            params: { limit, page }
        });

        const getProductsResponseBody: GetProductsResponseBody = {
            status: response.status,
            statusText: response.statusText,
            products: response.data.products
        }

        return getProductsResponseBody;
    }
}