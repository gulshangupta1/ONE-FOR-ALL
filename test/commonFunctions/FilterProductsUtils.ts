import { FileUtil } from "../../utils/file/FileUtil";
import { Product, ProductDetails } from "../resources/customTypes/ProductDetails";
import { CategoryType } from "../resources/customTypes/enums";
import { BaseScreen } from "../screens/base/BaseScreen";
import * as bestSellersJson from "../resources/testdata/best-sellers.json";
import * as newArrivalsJson from "../resources/testdata/new-arrivals.json";
import * as topRatedProductsJson from "../resources/testdata/top-rated-products.json";
import * as trendingProductsJson from "../resources/testdata/trending-products.json";

export class FilterProductsUtils extends BaseScreen {
    constructor() {
        super();
    }

    filterProductsByPriceAndCategory(minPrice: number, maxPrice: number, category: CategoryType): Product[] {
        let allProductsDetails: ProductDetails[] = [];
        allProductsDetails.push(FileUtil.convertJsonToCustomType(bestSellersJson));
        allProductsDetails.push(FileUtil.convertJsonToCustomType(newArrivalsJson));
        allProductsDetails.push(FileUtil.convertJsonToCustomType(topRatedProductsJson));
        allProductsDetails.push(FileUtil.convertJsonToCustomType(trendingProductsJson));

        let allMatchingProducts: Product[] = [];
        allProductsDetails.filter(productDetails => {
            productDetails.products.filter(product => {
                if (
                    (product.category.toLowerCase() === category.toLowerCase())
                    && (product.price > minPrice)
                    && (product.price < maxPrice)
                )
                    allMatchingProducts.push(product);
            });
        });

        return allMatchingProducts;
    }

    filterProductByCategory(category: CategoryType) {
        let allProductsDetails: ProductDetails[] = [];
        allProductsDetails.push(FileUtil.convertJsonToCustomType(bestSellersJson));
        allProductsDetails.push(FileUtil.convertJsonToCustomType(newArrivalsJson));
        allProductsDetails.push(FileUtil.convertJsonToCustomType(topRatedProductsJson));
        allProductsDetails.push(FileUtil.convertJsonToCustomType(trendingProductsJson));

        let allMatchingProducts: Product[] = [];
        allProductsDetails.filter((productDetails) => {
            productDetails.products.filter((product) => {
                if (product.category.toLowerCase() === category.toLowerCase())
                    allMatchingProducts.push(product);
            });
        });

        return allMatchingProducts
    }
}