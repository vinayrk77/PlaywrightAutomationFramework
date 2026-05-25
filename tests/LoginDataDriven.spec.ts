import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { MyAccount } from "../pages/MyAccountPage";
import { DataProvider } from "../utils/dataProvider";
import { TestConfig } from "../test.config";

//load json test data logindata.json

const jasonPath = "testdata/loginData.json";

const jsonTestDats = DataProvider.getDataFromJson(jasonPath);

for (const data of jsonTestDats) {
    test(`Login test with json test data: ${data.testName} @datadriven`, async ({ page }) => {
        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homepage = await new HomePage(page);
        await homepage.clickMyAccount();
        await homepage.clickLogin();

        const loginpage = new LoginPage(page);
        await loginpage.setEmail(data.email);
        await loginpage.setPassword(data.password);
        await loginpage.clickLogin();


        if (data.expected.toLowerCase() === 'success') {
            const myAccountPage = new MyAccount(page);
            const isLoggedIn = await myAccountPage.isMyPageAccountExists();
            expect(isLoggedIn).toBeTruthy();
        }
        else {
            const errorMessage = await loginpage.getErrormsg();
            await expect(
                errorMessage.includes('No match') ||
                errorMessage.includes('exceeded allowed number of login attempts')
            ).toBeTruthy();
        }


    });
}