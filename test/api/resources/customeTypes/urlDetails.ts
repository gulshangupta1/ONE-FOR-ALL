export interface UrlDetails {
    baseUrl: string,
    auth: {
        signUp: string,
        login: string
    },
    cart: {
        createCart: string,
        deleteCart: string,
        getCart: string
    },
    cartItem: {
        addItemToCart: string,
        updateCartItem: string
    },
    product: {
        getProducts: string,
        getProductById: string
    },
    profile: {
        createProfile: string,
        updateProfileInfo: string
    },
    payments: {
        makePayment: string
    }
}