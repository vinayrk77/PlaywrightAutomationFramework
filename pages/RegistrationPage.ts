import {Page, expect, Locator} from "@playwright/test";

export class RegistrationPage {
    private readonly page:Page

    //Locator

    private readonly txtFirstname: Locator;
    private readonly txtLastname: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtCnfPassword: Locator;
    private readonly chkSubscription: Locator;
    private readonly chkPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgconfirmation: Locator;

    //constructor
    constructor(page:Page){
        this.page = page;
        //Initiliaze Locators
        this.txtFirstname = page.getByPlaceholder('First Name');
        this.txtLastname = page.getByPlaceholder('Last Name');
        this.txtEmail = page.getByPlaceholder('E-Mail');
        this.txtTelephone = page.getByPlaceholder('Telephone');
        this.txtPassword = page.getByPlaceholder('Password');
        this.txtCnfPassword = page.getByPlaceholder('Password Confirm');
        this.chkSubscription = page.getByRole('radio', { name: 'Yes' });
        this.chkPolicy = page.locator('input[name="agree"]');
        this.btnContinue =  page.getByRole('button', { name: 'Continue' });
        this.msgconfirmation = page.getByText('Your Account Has Been Created!');
    }

    /**
    * Enter first name into textbox
    * @param fname First name of the user
    */
    async setFirstName(fname: string): Promise<void> {
        await this.txtFirstname.fill(fname);

    }
    
    /**
 * Last Name textbox
 * @param lname User last name
 */
async setLastName(lname: string): Promise<void> {
    await this.txtLastname.fill(lname);
}

/**
 * Email textbox
 * @param email User email address
 */
async setEmail(email: string): Promise<void> {
    await this.txtEmail.fill(email);
}

/**
 * Telephone textbox
 * @param phone User phone number
 */
async setTelephone(phone: string): Promise<void> {
    await this.txtTelephone.fill(phone);
}

/**
 * Password textbox
 * @param pwd User password
 */
async setPassword(pwd: string): Promise<void> {
    await this.txtPassword.fill(pwd);
}

/**
 * Confirm Password textbox
 * @param cnfpwd Confirm password
 */
async setConfirmPassword(cnfpwd: string): Promise<void> {
    await this.txtCnfPassword.fill(cnfpwd);
}

/**
 * Select newsletter subscription
 */
async selectSubscription(): Promise<void> {
    await this.chkSubscription.check();
}

/**
 * Accept privacy policy checkbox
 */
async acceptPolicy(): Promise<void> {
    await this.chkPolicy.check();
}

/**
 * Click Continue button
 */
async clickContinue(): Promise<void> {
    await this.btnContinue.click();
}

/**
 * Verify account creation confirmation message
 */
async getConfirmationMessage(): Promise<string> {
    return await this.msgconfirmation.textContent() ?? '';
}


}