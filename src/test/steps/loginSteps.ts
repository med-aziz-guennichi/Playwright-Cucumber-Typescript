import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

// Set the default timeout for steps in the scenario
setDefaultTimeout(60 * 1000 * 2);

/**
 * Step definitions for the Cucumber tests related to the user login functionality.
 * 
 * @author med-aziz-guennichi
 */

/**
 * Given step where the user navigates to the application URL.
 * 
 * @returns {Promise<void>} Resolves when the page navigation is complete.
 */
Given('User navigates to the application', async function () {
  await fixture.page.goto(process.env.BASEURL);
  fixture.logger.info("Navigated to the application");
});

/**
 * Given step where the user clicks the login link.
 * 
 * @returns {Promise<void>} Resolves when the login link is clicked.
 */
Given('User click on the login link', async function () {
  await fixture.page.locator("//span[text()='Login']").click();
});

/**
 * Given step where the user enters the username.
 * 
 * @param {string} username - The username to be entered.
 * @returns {Promise<void>} Resolves when the username is entered in the input field.
 */
Given('User enter the username as {string}', async function (username: string) {
  await fixture.page.locator("input[formcontrolname='username']").type(username);
});

/**
 * Given step where the user enters the password.
 * 
 * @param {string} password - The password to be entered.
 * @returns {Promise<void>} Resolves when the password is entered in the input field.
 */
Given('User enter the password as {string}', async function (password: string) {
  await fixture.page.locator("input[formcontrolname='password']").type(password);
});

/**
 * When step where the user clicks on the login button.
 * 
 * @returns {Promise<void>} Resolves when the login button is clicked and the page is loaded.
 */
When('User click on the login button', async function () {
  await fixture.page.locator("button[color='primary']").click();
  await fixture.page.waitForLoadState();
  fixture.logger.info("Waiting for 2 seconds");
  await fixture.page.waitForTimeout(2000);
});

/**
 * Then step where login success is verified by checking if the user menu is visible.
 * 
 * @returns {Promise<void>} Resolves when the user menu visibility is verified.
 */
Then('Login should be success', async function () {
  const user = fixture.page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]");
  await expect(user).toBeVisible();
  const userName = await user.textContent();
  console.log("Username: " + userName);
  fixture.logger.info("Username: " + userName);
});

/**
 * When step where login failure is verified by checking for the error message.
 * 
 * @returns {Promise<void>} Resolves when the login failure message is verified.
 */
When('Login should fail', async function () {
  const failureMesssage = fixture.page.locator("mat-error[role='alert']");
  await expect(failureMesssage).toBeVisible();
});
