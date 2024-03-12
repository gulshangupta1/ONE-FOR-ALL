import { GetProductsResponseBody } from "../models/response/product/getProducts.response";
import { ProductService } from "../service/product.service";

export class ProductClient {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async getProducts(accessToken: string, limit?: number, page?: number): Promise<GetProductsResponseBody> {
        const jsonResponse = await this.productService.getProducts(accessToken, limit, page);
        const getProductsResponseBody: GetProductsResponseBody = {
            statusCode: jsonResponse.status,
            statusText: jsonResponse.statusText,
            products: jsonResponse.data.products
        }

        return getProductsResponseBody;
    }
}   