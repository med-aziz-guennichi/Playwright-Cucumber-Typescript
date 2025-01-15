import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

/**
 * RegisterPage class encapsulates actions and verifications related to the user registration page of the application.
 * 
 * @author med-aziz-guennichi
 */
export default class RegisterPage {

  private readonly base: PlaywrightWrapper;

  /**
   * Initializes the RegisterPage with the provided Playwright Page instance.
   * 
   * @param {Page} page - The Playwright Page instance for interacting with the browser.
   */
  constructor(private readonly page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  /**
   * Stores the selectors for elements on the registration page.
   */
  private readonly Elements = {
    fName: "input[formcontrolname='firstname']",
    lname: "input[formcontrolname='lastname']",
    userName: "input[formcontrolname='username']",
    password: "input[formcontrolname='password']",
    confirmPassword: "input[formcontrolname='confirmPassword']",
    maleInput: "input[value='Male']",
    femaleInput: "input[value='Female']",
    maleRadioBtn: "//span[contains(text(),'Male')]",
    femaleRadioBtn: "//span[contains(text(),'Female')]",
    regBtn: "button[color='primary']"
  }

  /**
   * Navigates to the registration page of the application.
   * 
   * @returns {Promise<void>} Resolves when the registration page is successfully loaded.
   */
  async navigateToRegisterPage(): Promise<void> {
    await this.base.goto("https://bookcart.azurewebsites.net/register");
  }

  /**
   * Registers a new user with the provided details.
   * 
   * @param {string} firstname - The user's first name.
   * @param {string} lastname - The user's last name.
   * @param {string} userName - The user's unique username.
   * @param {string} password - The user's password.
   * @param {string} confirmPassword - The confirmation of the user's password.
   * @param {string} gender - The user's gender, either 'm' for male or 'f' for female.
   * @returns {Promise<void>} Resolves when the user registration is completed.
   */
  async registerUser(firstname: string, lastname: string, userName: string, password: string, confirmPassword: string, gender: string): Promise<void> {
    await this.page.type(this.Elements.fName, firstname);
    await this.page.type(this.Elements.lname, lastname);
    // this must be unique always
    await this.enterUsername(userName);
    await this.page.type(this.Elements.password, password);
    await this.page.type(this.Elements.confirmPassword, confirmPassword);
    if (gender == "m") {
      await this.page.click(this.Elements.maleRadioBtn);
      await expect(this.page.locator(this.Elements.maleInput)).toBeChecked();
    } else {
      await this.page.click(this.Elements.femaleRadioBtn);
      await expect(this.page.locator(this.Elements.femaleInput)).toBeChecked();
    }
    const regBtn = this.page.locator(this.Elements.regBtn);
    await regBtn.click();
  }

  /**
   * Enters the provided username into the username input field and verifies if the username is unique.
   * 
   * @param {string} userName - The username to enter and verify.
   * @returns {Promise<void>} Resolves when the username is successfully entered and validated.
   */
  async enterUsername(userName: string): Promise<void> {
    await this.page.type(this.Elements.userName, userName);
    const [response] = await Promise.all([
      this.page.waitForResponse(res => {
        return res.status() == 200
          &&
          res.url() == `https://bookcart.azurewebsites.net/api/user/validateUserName/${userName}`;
      })
    ]);
    await response.finished();
  }
}
