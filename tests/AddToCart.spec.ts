import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductsPage";
import { TestConfig} from "../test.config";


let config: TestConfig;
let homePage: HomePage;
let searchResult: SearchResultsPage;
let productPage: ProductPage;

test.beforeEach(async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    searchResult = new SearchResultsPage(page);
    productPage = new ProductPage(page);
});

test.afterEach(async({page})=>{
    await page.close();
});

test("Verify add to Cart flow @sanity", async()=>{

    await homePage.enterProductName(config.productName);

    await homePage.clickSearch(config.productName);

    expect(await searchResult.isSearchResultsPageExists()).toBeTruthy();
     
    const productName = config.productName;
    expect(await searchResult.isProductExists(productName)).toBeTruthy();

    if(await searchResult.isProductExists(productName)) {

        await searchResult.selectProduct(productName);
        await productPage.enterQuantity(config.productQuantity);
        await productPage.clickAddToCart();

        expect(await productPage.isConfirmationMessageDisplayed()).toBeTruthy();
    }


});

