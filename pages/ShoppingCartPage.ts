import { Page, Locator } from "@playwright/test";

export class ShoppingCartPage {

    private readonly page: Page;

    private readonly cartRows: Locator;
    private readonly btnCheckout: Locator;

    constructor(page: Page) {

        this.page = page;

        this.cartRows = page.locator('.table-responsive tbody tr');

        this.btnCheckout = page.getByRole('link', {
            name: 'Checkout'
        });
    }

    async getProductTotalPrice(productName: string): Promise<string> {

        const row = this.cartRows.filter({
            hasText: productName
        });

        return await row.locator('td.text-right').last().textContent() || '';
    }

    async proceedToCheckout() {
        await this.btnCheckout.click();
    }
}