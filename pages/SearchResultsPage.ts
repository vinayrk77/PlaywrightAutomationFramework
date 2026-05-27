import { Page, Locator } from "@playwright/test";
import { ProductPage } from "./ProductsPage";

export class SearchResultsPage {
    private readonly page: Page;

    private readonly searchHeaderPage: Locator;
    private readonly searchProducts: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchHeaderPage = page.getByRole('heading', { name: /search -/i });
        this.searchProducts = page.locator('h4>a');
    }

    /**
    *verify search page exists by checking header test
    * @returns promise<boolean> - returns true if page exists
    */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            const headerText = await this.searchHeaderPage.textContent();
            return headerText?.includes('Search -') ?? false;
        } catch (error) {
            return false;
        }
    }

    /**
    *check if product exists in search results by its name
    *@productname - The name of product to search for
    * @returns promise<boolean> - returns true if page exists
    */

    async isProductExists(productName: string): Promise<boolean> {
        try {
            const count = await this.searchProducts.count();
            for (let i = 0; i < count; i++) {
                const products = this.searchProducts.nth(i);
                const title = await products.textContent();
                if (title === productName) {
                    return true;
                }
            }
        } catch (error) {
            console.log(`Error checking the product Existence: ${error}`);
        }
        return false;
    }
    /**
    *select a product in search results by its name
    *@parm - productname - The name of product to select
    * @returns promise<ProductPage> - productPage instance after selecing the product
    */
    async selectProduct(productName: string): Promise<ProductPage | null> {
        try {
            const count = await this.searchProducts.count();
            for (let i = 0; i < count; i++) {
                const products = this.searchProducts.nth(i);
                const title = await products.textContent();
                if (title === productName) {
                    await products.click();
                    return new ProductPage(this.page)
                }
            }
            console.log(`Product not found: ${productName}`);
        } catch (error) {
            console.log(`Error selecting pproduct: ${productName}`);
        }
        return null;

    }

    /**
    *Get count of products in search results
    *@parm - promise<Number> number of products found
    */
    async getProductCount(): Promise<number> {
        return await this.searchProducts.count();
    }

}