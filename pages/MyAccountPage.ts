import {Page, Locator} from "@playwright/test";

export class MyAccount{
    private readonly page: Page;

    private readonly myHeading: Locator;
    private readonly lnkMyAccount: Locator;
    private readonly lnkLogout: Locator;

    //constructor

    constructor(page:Page){
        this.page = page;

        this.myHeading = page.getByRole('heading', { name: 'My Account' });
        this.lnkMyAccount = page.getByRole('link', { name: 'My Account' });
        this.lnkLogout = page.getByRole('link', {name: 'Logout'});
    }

/**
 * verify my account page is displayed
 * @returns<Promise Boolean> returns true when heading is visible
 */
async isMyPageAccountExists(): Promise <boolean>{
    try{
        const isVisible = await this.myHeading.isVisible();
        return isVisible;
    }catch(error){
        console.log(`Error checking My account heading visibility: ${error}`);
        return false;

        }
     }
/**
* clicks the login button
 */
   async clickMyAccount(): Promise<void>{
    await this.lnkMyAccount.click();
   }

/**
* clicks the Logout button
 */
async clickLogout(): Promise<void>{
    await this.lnkLogout.click();
}

}