import { Product } from "../resources/customTypes/ProductDetails";
import { BaseScreen } from "./base/BaseScreen";
import { expect } from "chai";

export class ProductScreen extends BaseScreen {
    constructor() {
        super();
    }

    private locators = {
        backButton: "#btn-back",
        searchButton: "#btn-search",
        cartButton: "#btn-cart",
        productName: "#txt-product-name",
        productPrice: "#txt-product-price",
        ratings: "#txt-rating-category",
        productDescription: "#txt-product-description",
        productBrand: "//android.widget.TextView[@text='brand']/following-sibling::android.widget.TextView",
        productSeller: "//android.widget.TextView[@text='seller']/following-sibling::android.widget.TextView",
        addToCartButton: "#txt-add-to-cart",
        goToCartButton: "#txt-go-to-cart"
    }

    async clickAddToCartButton(): Promise<void> {
        await this.click(this.locators.addToCartButton);
    }

    async clickGoToCartButton(): Promise<void> {
        await this.click(this.locators.goToCartButton);
    }

    async validateProductScreen(productDetails: Product): Promise<void> {
        await this.waitForDisplayed(this.locators.cartButton);
        expect(await this.getText(this.locators.productName), "Product name is not matching").to.be.equal(productDetails.name);
        expect(parseFloat(await this.getText(this.locators.productPrice)), "Product price is not matching").to.be.equal(productDetails.price);
        expect(parseFloat(await this.getText(this.locators.ratings)), "Product ratings are not matching").to.be.equal(productDetails.rating);
        expect(await this.getText(this.locators.productDescription), "Product description is not matching").to.be.equal(productDetails.description);
        expect(await this.getText(this.locators.productBrand), "Product branch is not matching").to.be.equal(productDetails.brand);
        expect(await this.getText(this.locators.productSeller), "Product branch is not matching").to.be.equal(productDetails.seller.seller_name);
        await this.waitForDisplayed(this.locators.addToCartButton);
    }
}