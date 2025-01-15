import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

/**
 * HeaderPage class encapsulates actions and verifications related to the header section of the application.
 * 
 * @author med-aziz-guennichi
 */
export default class HeaderPage {
  private readonly base: PlaywrightWrapper;

  /**
   * Initializes the HeaderPage with the provided Playwright Page instance.
   * 
   * @param {Page} page - The Playwright Page instance for interacting with the browser.
   */
  constructor(private readonly page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  /**
   * Stores the selectors for elements in the header section.
   */
  private readonly headerPageElements = {
    searchInput: "Search books or authors",
    cartBtn: "button.mat-focus-indicator.mat-icon-button",
    cartValue: "#mat-badge-content-0",
    loginLink: "//span[text()='Login']/..",
    userMenu: "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]",
    myOrder: "//button[text()='My Orders' and @role='menuitem']",
    logoutLink: "//button[text()='Logout' and @role='menuitem']"
  };

  /**
   * Enters the name of a book into the search input and selects the first matching result.
   * 
   * @param {string} bookname - The name of the book to search for.
   * @returns {Promise<void>} Resolves when the book name is entered and a suggestion is clicked.
   */
  async enterBookName(bookname: string): Promise<void> {
    await this.page.getByPlaceholder(this.headerPageElements.searchInput)
      .type(bookname);
    await this.base.waitAndClick("mat-option[role='option']");
  }

  /**
   * Clicks on the cart button.
   * 
   * @returns {Promise<void>} Resolves when the cart button is clicked.
   */
  async clickOnCart(): Promise<void> {
    await this.page.click(this.headerPageElements.cartBtn);
  }

  /**
   * Retrieves the current value displayed in the cart badge.
   * 
   * @returns {Promise<string | null>} Resolves with the text content of the cart badge.
   */
  async getCartValue(): Promise<string | null> {
    await this.page.waitForTimeout(1000);
    return await this.page.textContent(this.headerPageElements.cartValue);
  }

  /**
   * Clicks on the login link in the header.
   * 
   * @returns {Promise<void>} Resolves when the login link is clicked.
   */
  async clickLoginLink(): Promise<void> {
    await this.base.navigateTo(this.headerPageElements.loginLink);
  }

  /**
   * Clicks on the user menu to open the dropdown.
   * 
   * @returns {Promise<void>} Resolves when the user menu is clicked.
   */
  async clickOnUserMenu(): Promise<void> {
    await this.base.waitAndClick(this.headerPageElements.userMenu);
  }

  /**
   * Clicks on the "My Orders" option in the user menu.
   * 
   * @returns {Promise<void>} Resolves when the "My Orders" option is clicked.
   */
  async clickOnMyOrder(): Promise<void> {
    await this.clickOnUserMenu();
    await this.base.waitAndClick(this.headerPageElements.myOrder);
  }

  /**
   * Logs out the currently logged-in user by navigating to the logout link in the user menu.
   * 
   * @returns {Promise<void>} Resolves when the logout action is completed.
   */
  async logoutUser(): Promise<void> {
    await this.clickOnUserMenu();
    await this.base.navigateTo(this.headerPageElements.logoutLink);
  }

  /**
   * Verifies that the login was successful by checking the visibility of the user menu.
   * 
   * @returns {Promise<void>} Resolves when the user menu is verified to be visible.
   */
  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page.locator(this.headerPageElements.userMenu))
      .toBeVisible();
  }
}
