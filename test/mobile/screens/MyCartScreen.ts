import { XpathUtil } from "../../../utils/common/XpathUtil";
import { Product } from "../resources/customTypes/ProductDetails";
import { BaseScreen } from "./base/BaseScreen";
import { expect } from "chai";

export class MyCartScreen extends BaseScreen {
    constructor() {
        super();
    }

    private locators = {
        myCartHeader: "#txt-my-cart",
        totalPrice: "#txt-basket-total",
        productByName: "//android.widget.TextView[@text='##PLACEHOLDER##']",
        productPriceByName: "//android.widget.TextView[@text='##PLACEHOLDER##']/following-sibling::android.widget.TextView",
        placeOrderButton: "#txt-place-order",
        thankYouMessage: "#txt-thanks-shopping",
        conformedOrderMessage: "#txt-confirmed-order",
        orderDetailsButton: "#txt-order-details",
        continueShoppingButton: "#txt-continue-shopping",
        successImage: "#img-success",
    }

    async clickPlaceOrderButton(): Promise<void> {
        await this.click(this.locators.placeOrderButton);
        await this.waitForDisplayed(this.locators.successImage);
        await this.validateOrderConfirmedScreen();
    }

    async clickContinueShoppingButton(): Promise<void> {
        await this.click(this.locators.continueShoppingButton);
    }

    async clickOrderDetailsButton(): Promise<void> {
        await this.click(this.locators.orderDetailsButton);
    }

    // ToDo: More assertions
    async validateMyCartScreen(productList: Product[]) {
        await this.waitForDisplayed(this.locators.myCartHeader);

        const totalPrice: number = productList.reduce((total, product) => total + product.price, 0);
        const totalPriceUi = await this.getText(this.locators.totalPrice);
        expect(parseFloat(totalPriceUi.substring(totalPriceUi.indexOf(" ") + 1)),
            "Total price is not matching"
        ).to.be.equal(totalPrice);

        for (const product of productList) {
            expect(await this.swipeTillElement(XpathUtil.getPlaceholderReplaced(this.locators.productByName, product.name)),
                "Product did not displayed on My Cart screen"
            ).to.be.true;

            const productPriceUi = await this.getText(XpathUtil.getPlaceholderReplaced(this.locators.productPriceByName, product.name));
            expect(parseFloat(productPriceUi.substring(productPriceUi.indexOf(" ") + 1)),
                "Product price is not matching"
            ).to.be.equal(product.price);
        }
    }

    async validateOrderConfirmedScreen(): Promise<void> {
        expect(await this.getText(this.locators.thankYouMessage),
            "'Thanks for Shopping in UL-Shopify' text should display after placing order"
        ).to.be.equal("Thanks for Shopping in UL-Shopify");
        expect(await this.getText(this.locators.conformedOrderMessage),
            "'Your order has been confirmed' text should display after placing an order"
        ).to.be.equal("Your order has been confirmed");
        expect(await this.isDisplayed(this.locators.orderDetailsButton), "Order details button should display").to.be.true;
        expect(await this.isDisplayed(this.locators.continueShoppingButton), "Continue shopping button should display").to.be.true;
    }
}