import{test, expect} from "@playwright/test";
import{TestConfig} from "../test.config";
import{LoginPage} from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import {MyAccount} from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";

let loginpage: LoginPage;
let config: TestConfig;
let homepage: HomePage;
let myAccountPage: MyAccount;
let logout: LogoutPage;

test.beforeEach(async({page})=>{
config = new TestConfig();
await page.goto(config.appUrl);

loginpage = new LoginPage(page);
homepage = new HomePage(page);
myAccountPage = new MyAccount(page);
logout = new LogoutPage(page);
});

test("User logout test @master @regression", async()=>{
    await homepage.clickMyAccount();
    await homepage.clickLogin();
    await loginpage.setEmail(config.email);
    await loginpage.setPassword(config.password);
    await loginpage.clickLogin();
    

    const isloggedIn = await myAccountPage.isMyPageAccountExists();
    expect(isloggedIn).toBeTruthy;

    await myAccountPage.clickMyAccount();
    await myAccountPage.clickLogout();

    const isloggedOut = await logout.getLogoutMessage();
    expect(isloggedOut).toBe("Account Logout");
    const home = await logout.clickContinue();
    expect(await homepage.isHomePageExists()).toBe(true);

});