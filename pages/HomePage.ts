import { Page, Locator } from "@playwright/test";

export class HomePage {

    private readonly page: Page;
    //locator
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;
    private readonly txtSearchbox: Locator;
    private readonly btnSearch: Locator;


    //constructor
    constructor(page: Page) {
        this.page = page;
        this.lnkMyAccount = page.getByText('My Account').first();
        this.lnkRegister = page.getByRole('link', { name: 'Register' }).first();
        this.lnkLogin = page.getByRole('link', { name: 'Login' }).first();
        this.txtSearchbox = page.getByPlaceholder('Search');
        this.btnSearch = page.locator('#search button');
    }



    //action metods
    //Check if home page exists
    async isHomePageExists() {
        let title: string = await this.page.title();
        if (title) {
            return true;
        }
        return false;
    }

    //click my account link
    async clickMyAccount() {
        try {
            await this.lnkMyAccount.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'My Account': ${error}`);
            throw error;
        }
    }

    //click register
    async clickRegister() {
        try {
            await this.lnkRegister.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Register': ${error}`);
            throw error;
        }
    }

    //click login 
    async clickLogin() {
        try {
            await this.lnkLogin.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Login': ${error}`);
            throw error;
        }
    }

    //Enter product name in search box
    async enterProductName(pName: string) {
        try {
            await this.txtSearchbox.fill(pName);
        } catch (error) {
            console.log(`Exception occurred while entering 'product name': ${error}`);
            throw error;
        }
    }

    //click on search button
    async clickSearch(pName: string) {
        try {
            await this.txtSearchbox.click();
            await this.btnSearch.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'search': ${error}`);
            throw error;
        }
    }
}