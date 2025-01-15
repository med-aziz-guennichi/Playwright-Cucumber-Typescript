import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

/**
 * LoginPage class encapsulates actions and verifications related to the login page of the application.
 * 
 * @author med-aziz-guennichi
 */
export default class LoginPage {
  private readonly base: PlaywrightWrapper;

  /**
   * Initializes the LoginPage with the provided Playwright Page instance.
   * 
   * @param {Page} page - The Playwright Page instance for interacting with the browser.
   */
  constructor(private readonly page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  /**
   * Stores the selectors for elements on the login page.
   */
  private readonly Elements = {
    userInput: "Username",
    passwordInput: "Password",
    loginBtn: "button[color='primary']",
    errorMessage: "alert"
  };

  /**
   * Navigates to the login page and verifies the page title.
   * 
   * @returns {Promise<void>} Resolves when the login page is successfully loaded and the title is verified.
   */
  async navigateToLoginPage(): Promise<void> {
    await this.base.goto("/login");
    await expect(this.page).toHaveTitle("BookCart");
  }

  /**
   * Enters the provided username into the username input field.
   * 
   * @param {string} user - The username to enter.
   * @returns {Promise<void>} Resolves when the username is entered.
   */
  async enterUserName(user: string): Promise<void> {
    await this.page.getByLabel(this.Elements.userInput).fill(user);
  }

  /**
   * Enters the provided password into the password input field.
   * 
   * @param {string} Password - The password to enter.
   * @returns {Promise<void>} Resolves when the password is entered.
   */
  async enterPassword(Password: string): Promise<void> {
    await this.page.getByLabel(this.Elements.passwordInput).fill(Password);
  }

  /**
   * Clicks the login button.
   * 
   * @returns {Promise<void>} Resolves when the login button is clicked.
   */
  async clickLoginButton(): Promise<void> {
    await this.base.waitAndClick(this.Elements.loginBtn);
  }

  /**
   * Retrieves the error message displayed on the login page, if any.
   * 
   * @returns {Promise<string | null>} Resolves with the text content of the error message.
   */
  getErrorMessage(): Promise<string | null> {
    return this.page.getByRole("alert").textContent();
  }

  /**
   * Performs the complete login process by entering the provided username and password, 
   * and clicking the login button.
   * 
   * @param {string} user - The username to enter.
   * @param {string} password - The password to enter.
   * @returns {Promise<void>} Resolves when the login process is completed.
   */
  async loginUser(user: string, password: string): Promise<void> {
    await this.enterUserName(user);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
