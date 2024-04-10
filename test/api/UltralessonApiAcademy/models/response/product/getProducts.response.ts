import { BaseResponse } from "../base.response"

export interface GetProductsResponseBody extends BaseResponse {
    products: Product[]
}

export interface Product {
    created_at: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    id: string,
    category_id: string
}

export const getProductsResponseSchema = {
    "type": "object",
    "properties": {
        "products": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "created_at": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "price": {
                        "type": "number"
                    },
                    "quantity": {
                        "type": "number"
                    },
                    "id": {
                        "type": "string"
                    },
                    "category_id": {
                        "type": "string"
                    }
                },
                "required": [
                    "created_at",
                    "name",
                    "description",
                    "price",
                    "quantity",
                    "id",
                    "category_id"
                ]
            }
        }
    },
    "required": [
        "products"
    ]
}

export const productSchema = {
    "type": "object",
    "properties": {
        "product": {
            "type": "object",
            "properties": {
                "created_at": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "price": {
                    "type": "number"
                },
                "quantity": {
                    "type": "number"
                },
                "id": {
                    "type": "string"
                },
                "category_id": {
                    "type": "string"
                }
            },
            "required": [
                "created_at",
                "name",
                "description",
                "price",
                "quantity",
                "id",
                "category_id"
            ]
        }
    },
    "required": [
        "product"
    ]
}