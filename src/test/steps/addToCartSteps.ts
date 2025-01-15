import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

// Set the default timeout for steps in the scenario
setDefaultTimeout(60 * 1000 * 2);

/**
 * Step definitions for the Cucumber tests related to the book search and cart functionality.
 * 
 * @author med-aziz-guennichi
 */

/**
 * Given step where the user searches for a specific book.
 * 
 * @param {string} book - The name of the book to search for.
 * @returns {Promise<void>} Resolves when the search operation is complete.
 */
Given('user search for a {string}', async function (book: string) {
  fixture.logger.info("Searching for a book: " + book);
  await fixture.page.locator("input[type='search']").type(book);
  await fixture.page.waitForTimeout(2000);
  await fixture.page.locator("mat-option[role='option'] span").click();
});

/**
 * When step where the user adds the book to the cart.
 * 
 * @returns {Promise<void>} Resolves when the book is added to the cart.
 */
When('user add the book to the cart', async function () {
  await fixture.page.locator("//button[@color='primary']").click();
  const toast = fixture.page.locator("simple-snack-bar");
  await expect(toast).toBeVisible();
  await toast.waitFor({ state: "hidden" });
});

/**
 * Then step where the cart badge count is verified to have been updated.
 * 
 * @returns {Promise<void>} Resolves when the cart badge is successfully validated.
 */
Then('the cart badge should get updated', async function () {
  const badgeCount = await fixture.page.locator("#mat-badge-content-0").textContent();
  expect(Number(badgeCount)).toBeGreaterThan(0);
});
