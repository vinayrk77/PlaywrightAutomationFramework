import {Page, expect, Locator} from "@playwright/test";

export class LoginPage{
    private readonly page: Page;

    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly txterrormsg: Locator

    //constructor

    constructor (page:Page){
        this.page = page;

        this.txtEmail = page.locator("#input-email");
        this.txtPassword = page.locator("#input-password");
        this.btnLogin = page.getByRole('button', {name: 'Login'});
        this.txterrormsg = page.locator(".alert-danger");
    }

    //Actions

    /**
    * Enter email into textbox
    * @param email  email of the user
    */
   async setEmail(email:string): Promise<void>{
    await this.txtEmail.fill(email);
   }

   /**
    * Enter password into textbox
    * @param password  of the user
    */
   async setPassword(password:string):Promise<void>{
    await this.txtPassword.fill(password);
   }

   /**
    * clicks the login button
    */
   async clickLogin(): Promise<void> {

    await this.btnLogin.waitFor({ state: 'visible' });

    await this.btnLogin.click();

    await this.page.waitForLoadState('networkidle');
}

   /**
 * Verify login fail error message
 */
async getErrormsg():Promise<string>{
    console.log(await this.txterrormsg.count());
    return await this.txterrormsg.textContent() ?? '';
}


}