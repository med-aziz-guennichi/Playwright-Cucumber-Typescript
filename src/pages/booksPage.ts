import { expect, Page } from "@playwright/test";
import HeaderPage from "./headerPage";

/**
 * BooksPage class handles interactions and verifications on the Books page.
 * 
 * @author med-aziz-guennichi
 */
export default class BooksPage {

  private readonly header: HeaderPage;

  /**
   * Initializes the BooksPage with the provided Playwright Page instance.
   * 
   * @param {Page} page - The Playwright Page instance for interacting with the browser.
   */
  constructor(private readonly page: Page) {
    this.header = new HeaderPage(page);
  }

  /**
   * Stores the selectors for elements on the Books page.
   */
  private readonly Elements = {
    categories: "app-book-filter a",
    title: "div.card-title",
    price: "div.card-title +p",
    addToCartBtn: "//button[@color='primary']",
    bookCard: "mat-card",
    snackBar: "//simple-snack-bar/span[1]"
  };

  /**
   * Verifies that the categories displayed on the page match the expected list.
   * 
   * @param {string[]} categories - An array of category names to verify.
   * @returns {Promise<void>} Resolves when the categories are verified.
   */
  async verifyAllCategories(categories: string[]): Promise<void> {
    const bookCategories = this.page.locator(this.Elements.categories);
    await expect(bookCategories).toHaveText(categories);
  }

  /**
   * Searches for a book and adds it to the cart, then verifies that the action was successful.
   * 
   * @param {string} book - The name of the book to add to the cart.
   * @returns {Promise<void>} Resolves when the book is added to the cart and the toast message is verified.
   */
  async addBookToCart(book: string): Promise<void> {
    await this.header.enterBookName(book);
    await expect(this.page.locator(this.Elements.title))
      .toHaveText(book, { ignoreCase: true });
    this.page.click(this.Elements.addToCartBtn);
    const toast = this.page.locator(this.Elements.snackBar);
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText("One Item added to cart");
  }
}
