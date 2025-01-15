import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

/**
 * Initializes environment variables and starts the browser before all tests.
 * 
 * @author med-aziz-guennichi
 */
BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

/**
 * Sets up a browser context and tracing for scenarios without authentication.
 * This runs before each scenario tagged with `not @auth`.
 * 
 * @param {object} param0 - Cucumber hook parameters.
 * @param {Pickle} param0.pickle - The pickle object containing scenario details.
 */
Before({ tags: "not @auth" }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

/**
 * Sets up a browser context with storage state and tracing for authenticated scenarios.
 * This runs before each scenario tagged with `@auth`.
 * 
 * @param {object} param0 - Cucumber hook parameters.
 * @param {Pickle} param0.pickle - The pickle object containing scenario details.
 */
Before({ tags: "@auth" }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    storageState: getStorageState(pickle.name),
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

/**
 * Performs cleanup after each scenario, including capturing screenshots, stopping tracing,
 * and attaching videos and traces to the Cucumber report.
 * 
 * @param {object} param0 - Cucumber hook parameters.
 * @param {Pickle} param0.pickle - The pickle object containing scenario details.
 * @param {Result} param0.result - The result object containing the scenario status.
 */
After(async function ({ pickle, result }) {
  let videoPath: string;
  let img: Buffer;
  const path = `./test-results/trace/${pickle.id}.zip`;

  if (result?.status === Status.PASSED) {
    img = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    videoPath = await fixture.page.video().path();
  }

  await context.tracing.stop({ path });
  await fixture.page.close();
  await context.close();

  if (result?.status === Status.PASSED) {
    await this.attach(img, "image/png");
    await this.attach(fs.readFileSync(videoPath), "video/webm");
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
    await this.attach(`Trace file: ${traceFileLink}`, "text/html");
  }
});

/**
 * Closes the browser after all tests have completed.
 */
AfterAll(async function () {
  await browser.close();
});

/**
 * Retrieves the storage state file path based on the user's role.
 * 
 * @param {string} user - The name of the user (e.g., "admin" or "lead").
 * @returns {string|object} The path to the storage state JSON file or a storage state object.
 */
function getStorageState(user: string): string | {
  cookies: {
    name: string;
    value: string;
    domain: string;
    path: string;
    expires: number;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "Strict" | "Lax" | "None";
  }[];
  origins: {
    origin: string;
    localStorage: { name: string; value: string }[];
  }[];
} {
  if (user.endsWith("admin")) {
    return "src/helper/auth/admin.json";
  } else if (user.endsWith("lead")) {
    return "src/helper/auth/lead.json";
  }
}
