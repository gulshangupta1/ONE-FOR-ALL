import { BaseResponse } from "../base.response";
import { Product } from "./getProducts.response";

export interface GetProductByIdResponseBody extends BaseResponse {
    product: Product;
}