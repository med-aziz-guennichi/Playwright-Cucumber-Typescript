import { Page } from "@playwright/test";

/**
 * PlaywrightWrapper class provides utility methods for interacting with a Playwright page, 
 * simplifying common operations like navigation and element interactions.
 * 
 * @author med-aziz-guennichi
 */
export default class PlaywrightWrapper {
  /**
   * Initializes a new instance of the PlaywrightWrapper class.
   * 
   * @param {Page} page - The Playwright page object to interact with.
   */
  constructor(private readonly page: Page) { }

  /**
   * Navigates to the specified URL and waits until the DOM content is fully loaded.
   * 
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<void>} A promise that resolves when navigation is complete.
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded"
    });
  }

  /**
   * Waits for the specified element to become visible, then clicks it.
   * 
   * @param {string} locator - The selector for the element to interact with.
   * @returns {Promise<void>} A promise that resolves when the element is clicked.
   */
  async waitAndClick(locator: string): Promise<void> {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: "visible"
    });
    await element.click();
  }

  /**
   * Performs navigation to a link by clicking on it and waiting for the navigation event to complete.
   * 
   * @param {string} link - The selector for the link to navigate to.
   * @returns {Promise<void>} A promise that resolves when navigation is complete.
   */
  async navigateTo(link: string): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(link)
    ]);
  }
}
