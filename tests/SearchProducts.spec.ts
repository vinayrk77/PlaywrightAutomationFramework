import { test, expect } from "playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { TestConfig } from "../test.config";

let config: TestConfig;
let homePage: HomePage;
let searchResults: SearchResultsPage;

test.beforeEach(async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);

homePage = new HomePage(page);
searchResults = new SearchResultsPage(page);
});


test('products search results @master @regrssion', async()=>{
    const ProductName = config.productName;

    await homePage.enterProductName(ProductName);
    await homePage.clickSearch(config.productName);

    expect(await searchResults.isSearchResultsPageExists()).toBeTruthy();

    const isProductFound = await searchResults.isProductExists(ProductName);
    expect(isProductFound).toBeTruthy();

});