import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from "../utils/randomDataGenerators";
import { TestConfig } from "../test.config";

let homepage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
    const config = new TestConfig();
    await page.goto(config.appUrl);
    homepage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
    await page.close();

});

test("Verify user registration test @master @sanity @regression", async ({ page }) => {
    await homepage.clickMyAccount();
    await homepage.clickRegister();

    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);
    await registrationPage.selectSubscription();
    await registrationPage.acceptPolicy();
    await registrationPage.clickContinue();

    const confirmationmsg = await registrationPage.getConfirmationMessage();
    expect(confirmationmsg).toContain("Your Account Has Been Created");

    await page.waitForTimeout(3000);


});