import { Given, When, Then } from "@cucumber/cucumber";
import RegisterPage from "../../pages/registerPage";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import * as data from "../../helper/util/test-data/registerUser.json";

// Declare variables for page objects and assertion helper
let registerPage: RegisterPage;
let assert: Assert;

/**
 * Step definitions for the Cucumber tests related to user registration functionality.
 * 
 * @author med-aziz-guennichi
 */

/**
 * Given step where the user navigates to the registration page.
 * 
 * @returns {Promise<void>} Resolves when the registration page navigation is complete.
 */
Given('I navigate to the register page', async function () {
  registerPage = new RegisterPage(fixture.page);
  assert = new Assert(fixture.page);
  await registerPage.navigateToRegisterPage();
});

/**
 * When step where the user creates a new user account.
 * 
 * @returns {Promise<void>} Resolves when the user registration process is complete.
 */
When('I created a new user', async function () {
  const username = data.userName + Date.now().toString(); // Generate a unique username with timestamp
  await registerPage.registerUser(
    data.firstName,
    data.lastName,
    username,
    data.password,
    data.confirmPassword,
    "m"
  );
});

/**
 * Then step where the success of the user registration is confirmed by checking the URL.
 * 
 * @returns {Promise<void>} Resolves when the URL is validated to confirm the registration success.
 */
Then('I confirm user registration is success', async function () {
  await assert.assertURL("https://bookcart.azurewebsites.net/login");
});
