# Playwright-Cucumber-Typescript

This project integrates [Playwright](https://playwright.dev/), [Cucumber](https://cucumber.io/), and [TypeScript](https://www.typescriptlang.org/) to facilitate Behavior-Driven Development (BDD) for end-to-end testing of web applications.

## Project Structure

- `src/`: Contains the source code for tests and step definitions.
  - `test/`
    - `features/`: Holds the `.feature` files written in Gherkin syntax, describing the test scenarios.
    - `steps/`: Contains the step definitions that map Gherkin steps to Playwright actions.

## Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/med-aziz-guennichi/Playwright-Cucumber-Typescript.git
   cd Playwright-Cucumber-Typescript
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

## Running Tests

To execute all tests:

```bash
npm test
```

This command will run the Cucumber tests using Playwright and output the results in the terminal.

## Writing Tests

1. **Feature Files:**

   - Located in `src/test/features/`.
   - Written in Gherkin syntax, e.g.,

     ```gherkin
     Feature: Sample feature

       Scenario: Sample scenario
         Given I navigate to the homepage
         When I click on the "Login" button
         Then I should see the login form
     ```

2. **Step Definitions:**

   - Located in `src/test/steps/`.
   - Implement the actions for each step in TypeScript, e.g.,

     ```typescript
     import { Given, When, Then } from '@cucumber/cucumber';
     import { expect } from '@playwright/test';

     Given('I navigate to the homepage', async function () {
       await page.goto('https://example.com');
     });

     When('I click on the {string} button', async function (buttonText) {
       await page.click(`text=${buttonText}`);
     });

     Then('I should see the login form', async function () {
       const form = await page.$('form#login');
       expect(form).not.toBeNull();
     });
     ```

## Configuration

- **TypeScript:** Configured via `tsconfig.json`.
- **Playwright:** Default settings can be adjusted in `playwright.config.ts`.
- **Cucumber:** Options set in `cucumber.js`.

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Cucumber Documentation](https://cucumber.io/docs/guides/10-minute-tutorial/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
