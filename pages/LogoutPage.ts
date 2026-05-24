import { Page, Locator} from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage{

    private readonly page:Page

    private readonly txtLogoutmsg: Locator;
    private readonly btnContinue: Locator

    //constructor

    constructor(page:Page){
        this.page=page;


        this.txtLogoutmsg = page.getByRole('heading', {name: 'Account Logout'});
        this.btnContinue = page.getByRole('link', {name: 'Continue'});
    }
/**
* Verify logout message
*/
async getLogoutMessage(): Promise<string> {
    return await this.txtLogoutmsg.textContent() ?? '';
}

/**
* Click Continue button after logout
* @returns promise<isHomePage> - promise instance of home page
*/
async clickContinue(): Promise<HomePage>{
    await this.btnContinue.click();
    return new HomePage(this.page);
}


}