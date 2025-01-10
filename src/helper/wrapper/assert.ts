import { expect, Page } from "@playwright/test";

/**
 * Assert class provides utility methods for asserting page properties such as title and URL.
 * 
 * @author med-aziz-guennichi
 */
export default class Assert {
  /**
   * Creates an instance of the Assert class.
   * @param {Page} page - The Playwright page object to interact with.
   */
  constructor(private readonly page: Page) { }

  /**
   * Asserts that the current page's title matches the specified title.
   * 
   * @param {string} title - The exact title to verify.
   * @returns {Promise<void>} A promise that resolves when the assertion passes or rejects if it fails.
   */
  async assertTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  /**
   * Asserts that the current page's title contains the specified string.
   * 
   * @param {string} title - The string to check in the page title.
   * @returns {Promise<void>} A promise that resolves when the assertion passes or rejects if it fails.
   */
  async assertTitleContains(title: string): Promise<void> {
    const pageTitle = await this.page.title();
    expect(pageTitle).toContain(title);
  }

  /**
   * Asserts that the current page's URL matches the specified URL.
   * 
   * @param {string} url - The exact URL to verify.
   * @returns {Promise<void>} A promise that resolves when the assertion passes or rejects if it fails.
   */
  async assertURL(url: string): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  /**
   * Asserts that the current page's URL contains the specified string.
   * 
   * @param {string} title - The string to check in the page URL.
   * @returns {Promise<void>} A promise that resolves when the assertion passes or rejects if it fails.
   */
  async assertURLContains(title: string): Promise<void> {
    const pageURL = this.page.url();
    expect(pageURL).toContain(title);
  }
}

