import { BaseService } from "./base.service";
import axios from "axios";

export class ProductService extends BaseService {
    async getProducts(accessToken: string, limit?: number, page?: number) {
        accessToken = `Bearer ${accessToken}`;
        let url = `${this.getBaseUrl()}/api/products`;

        return await axios.get(url, {
            headers: { "Authorization": accessToken },
            params: { limit, page }
        });
    }
}