import {test, expect} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccount } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";

let config: TestConfig;
let homepage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccount;

test.beforeEach(async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);
    homepage = new HomePage(page);

    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccount(page);
});

test.afterEach(async({page})=>{
    await page.close();
});

test("user login test @master @sanity @regression", async()=>{

    await homepage.clickMyAccount();
    await homepage.clickLogin();
    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

    const isloggedIn = await myAccountPage.isMyPageAccountExists();
    expect(isloggedIn).toBeTruthy;
});


