import { LOGGER } from "../../../../../utils/reporting/LoggerHelper";
import { GetProductByIdResponseBody } from "../../models/response/UltralessonApiAcademy/product/getProductById.response";
import { GetProductsResponseBody } from "../../models/response/UltralessonApiAcademy/product/getProducts.response";
import { BaseService } from "./base.service";
import axios, { AxiosResponse } from "axios";

export class ProductService extends BaseService {
    async getProducts(accessToken: string, limit?: number, page?: number): Promise<GetProductsResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().product.getProducts}`;
        this.axiosRequestConfig.headers = { "Authorization": `Bearer ${accessToken}` };
        this.axiosRequestConfig.params = { limit, page };

        try {
            const response: AxiosResponse<any, any> = await axios.get(url, this.axiosRequestConfig);

            const getProductsResponseBody: GetProductsResponseBody = {
                status: response.status,
                statusText: response.statusText,
                products: response.data.products
            }

            return getProductsResponseBody;
        } catch (err) {
            LOGGER.error(`Error while getting product detils.\n${err.stack}`);
            throw err;
        }
    }

    async getProductById(accessToken: string, productId: string): Promise<GetProductByIdResponseBody> {
        const url: string = `${this.getBaseUrl()}/${this.getUrlDetails().product.getProductById}`
            .replace("{{PRODUCT_ID}}", productId);
        const token: string = `Bearer ${accessToken}`;

        try {
            const response = await axios.get(url, {
                headers: { "Authorization": token }
            });

            const getProductByIdResponseBody: GetProductByIdResponseBody = {
                status: response.status,
                statusText: response.statusText,
                product: response.data.product
            }

            return getProductByIdResponseBody;
        } catch (err) {
            LOGGER.error(`Error while getting product detils by id.\n${err.stack}`);
            throw err;
        }

    }
}