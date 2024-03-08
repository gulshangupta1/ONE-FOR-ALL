export interface ProductDetails {
    title: string,
    description: string,
    products: Product[],
}

export interface Product {
    product_id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    price: number,
    discounted_price: number,
    stock_quantity: number,
    image_url: string,
    features: Feature[],
    rating: number,
    reviews_count: number,
    seller: Seller,
    is_featured: boolean,
    is_new_arrival: boolean,
    is_best_seller: boolean,
    is_discounted: boolean,
    is_out_of_stock: boolean
}

interface Feature {
    id: number,
    description: string,

}

interface Seller {
    seller_id: string,
    seller_name: string,
    seller_rating: number
}