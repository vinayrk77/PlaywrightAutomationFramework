import { Page, Locator } from "@playwright/test";

export class ProductPage {
    private readonly page: Page;

    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;

    constructor(page: Page) {
        this.page = page;

        this.txtQuantity = page.locator('input#input-quantity');
        this.btnAddToCart = page.getByRole('button', { name: 'Add to Cart' });
        this.cnfMsg = page.locator('div.alert');
        this.btnItems = page.locator('div#cart');
        this.lnkViewCart = page.getByRole('link', { name: 'View Cart' });
    }

    async enterQuantity(quantity: string) {

        try {
            await this.txtQuantity.clear();
            await this.txtQuantity.fill(quantity);
        } catch (error) {
            console.log(`Exception occurred while entering quantity: ${error}`);
            throw error;
        }
    }

    async clickAddToCart() {
        try {
            await this.btnAddToCart.click();
        } catch (error) {
            console.log(`Exception occurred while clicking Add To Cart: ${error}`);
            throw error;
        }
    }

    async isConfirmationMessageDisplayed(): Promise<boolean> {
        try {
            await this.cnfMsg.waitFor({ state: 'visible' });
            return await this.cnfMsg.isVisible();
        } catch (error) {
            console.log(`Confirmation message not displayed: ${error}`);
            return false;
        }
    }

    async getConfirmationMessage(): Promise<string> {
        try {
            return await this.cnfMsg.textContent() || '';
        } catch (error) {
            console.log(`Unable to fetch confirmation message: ${error}`);
            return '';
        }
    }

    async openShoppingCart() {
         try {
            await this.btnItems.click();
        } catch (error) {
            console.log(`Exception occurred while opening cart: ${error}`);
            throw error;
        }
    }

    async clickViewCart() {
        try {
            await this.lnkViewCart.click();
        } catch (error) {
            console.log(`Exception occurred while clicking View Cart: ${error}`);
            throw error;
        }
    }
}