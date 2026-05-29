import { test, expect, Page } from "@playwright/test";
import { RandomDataUtil } from "../utils/randomDataGenerators";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { TestConfig } from "../test.config";
import { MyAccount } from "../pages/MyAccountPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { ProductPage } from "../pages/ProductsPage";

test("Execute End to End flow @end-to-end @regression", async ({ page }) => {
    const config = new TestConfig();

    //Navigate to application homepage
    await page.goto(config.appUrl);

    //Register with new email and capture email
    let registeredEmail = await performRegistration(page);
    console.log("👍 Registration is completed");

    //Logout after successful Registration
    await performLogout(page);
    console.log("👍 Logout is completed");

    //Login with registered Email
    await performLogin(page, registeredEmail);
    console.log("👍 Login is completed");

    //Search for the product and add it to cart
    await addProductToCart(page);
    console.log("👍 Product is added to cart");

    //verify the content of shopping cart
    await verifyShoppingCart(page);
    console.log("👍 shopping cart verification is completed");
});


async function performRegistration(page: Page): Promise<string> {
    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    const registrationPage = new RegistrationPage(page);

    //Fill Random Details
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());


    let email: string = RandomDataUtil.getEmail();
    await registrationPage.setEmail(email);
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    await registrationPage.setPassword('test@123');
    await registrationPage.setConfirmPassword('test@123');

    await registrationPage.selectSubscription();
    await registrationPage.acceptPolicy();
    await registrationPage.clickContinue();

    // validate registration was succesfull
    const confirmationMsg = await registrationPage.getConfirmationMessage();
    expect(confirmationMsg).toContain('Your Account Has Been Created');

    return email; // Return the email for login test.
}

//Function to Logout From current user

async function performLogout(page: Page) {
    const homePage = new HomePage(page);

    //Open My Account dropdown
    await homePage.clickMyAccount();

    const myAccount = new MyAccount(page);
    const logoutPage: LogoutPage = await myAccount.clickLogout();

    //Ensure continue button is visible
    expect(await logoutPage.getLogoutMessage()).toBe("Account Logout");

    //click continue button
    const home = await logoutPage.clickContinue();
    expect(await home.isHomePageExists()).toBe(true);
}

async function performLogin(page: Page, email: string) {
    const config = new TestConfig();
    await page.goto(config.appUrl); //Reload homepage.

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);
    await loginPage.setEmail(email);
    await loginPage.setPassword('test@123');
    await loginPage.clickLogin();

    //verify login by checking my accunt page

    const myAccountPage = new MyAccount(page);
    expect(await myAccountPage.isMyPageAccountExists()).toBeTruthy();
}

async function addProductToCart(page: Page) {
    const homePage = new HomePage(page);

    const config = new TestConfig;
    const productName: string = config.productName;
    const productQuantity: string = config.productQuantity;

    await homePage.enterProductName(productName);
    await homePage.clickSearch(productName);

    const searchResultsPage = new SearchResultsPage(page)

    //validate search result page
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    //Select product and set Quantity
    const productPage = await searchResultsPage.selectProduct(productName);
    await productPage?.enterQuantity(productQuantity);
    await productPage?.clickAddToCart(); //add product to shoppoing cart

    await page.waitForTimeout(3000);

    //confir product was added
    expect(await productPage?.isConfirmationMessageDisplayed()).toBe(true);
}

async function verifyShoppingCart(page: Page) {
    const productPage = new ProductPage(page);

    //navigate to shopping cart from product page
    await productPage.openShoppingCart();
    await productPage.clickViewCart();
    const shoppingCartPage = new ShoppingCartPage(page);

    console.log("👍 Navigated to Shopping cart");

    const config = new TestConfig();

    // validate total price is correct(based on config file)
    expect(await shoppingCartPage.getProductTotalPrice(config.totalPrice)).toBe(config.totalPrice);
}