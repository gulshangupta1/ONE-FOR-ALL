import { HomeScreen } from "../screens/HomeScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { BaseScreen } from "../screens/base/BaseScreen";

export class HomeScreenUtils extends BaseScreen {
    homeScreen: HomeScreen;
    searchScreen: SearchScreen;

    constructor() {
        super();
        this.homeScreen = new HomeScreen();
        this.searchScreen = new SearchScreen();
    }

    async searchAndSelectProductByName(productName: string) {
        await this.homeScreen.searchProduct(productName);
        await this.searchScreen.selectProductByName(productName);
    }
}