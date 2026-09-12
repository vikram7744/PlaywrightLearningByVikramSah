# Playwright Learning Framework (JavaScript)

A compact, practical starting point for learning browser automation with [Playwright](https://playwright.dev/) and JavaScript.

## What is included

- Playwright Test runner and cross-browser projects (Chromium, Firefox, WebKit)
- A Page Object Model example in `pages/HomePage.js`
- Shared fixtures, structured test data, tagged tests, and named test steps
- Two readable sample tests in `tests/home.spec.js`
- A complete login-to-checkout scenario against the public Sauce Demo practice site
- API tests using Playwright's built-in HTTP request fixture (no browser required)
- Reusable authenticated browser state for the Sauce Demo E2E flow
- HTML reports, screenshots, video, and retry traces for failed tests
- Environment-ready `BASE_URL` configuration
- GitHub Actions CI, including a downloadable HTML report artifact

## Prerequisites

Install [Node.js LTS](https://nodejs.org/) (version 18 or later), then confirm it is available:

```bash
node --version
npm --version
```

## Setup

```bash
npm install
npx playwright install
```

The first command installs the framework; the second downloads the browser engines Playwright uses.

## Run tests

```bash
npm test                 # all configured browsers (runs headlessly)
npm run test:smoke       # only @smoke tests
npm run test:api         # API tests only; no browser window opens
npm run test:chromium    # all tests in Chromium
npx playwright test --grep @e2e  # Sauce Demo purchase flow only
npx playwright test --project=chromium
npm run test:headed      # watch the browser run
npm run test:ui          # use Playwright's visual test runner
npm run test:debug       # step through a test
npm run report           # open the latest HTML report
```

## Project layout

```text
pages/                  reusable page actions and locators
fixtures/               shared test setup and reusable test objects
test-data/              test constants and scenario data
tests/                  test specifications
playwright.config.js    test and browser configuration
.env.example            example environment configuration
.github/workflows/      automated test run on GitHub
```

## Learning path

1. Run `npx playwright test --project=chromium`.
2. Read `tests/home.spec.js`, then inspect the custom fixture and `HomePage` object it uses.
3. Add a test for another user journey, keeping locators and actions in a page object.
4. Use `@smoke` to tag your high-priority scenarios and run them with `npm run test:smoke`.
5. Use `npm run test:ui` to explore locator generation and debugging.
6. Push to GitHub to have the included workflow test every pull request.

## E2E practice flow

`tests/checkout.spec.js` automates a full purchase on the public Sauce Demo training site. It is deliberately split into `LoginPage`, `InventoryPage`, `CartPage`, and `CheckoutPage` objects so each page owns its locators and actions. The scenario uses no private credentials and does not submit a real payment.

Run only this scenario with:

```bash
npx playwright test --grep @e2e --project=chromium --headed
```

Copy `.env.example` to `.env` if you want to override the demo URL or credentials. Never commit a real `.env` file.

### Reusing an authenticated session

`tests/auth.setup.js` is a Playwright setup test. It signs in once and saves the browser storage state to `.auth/sauce-demo-user.json`. The Chromium, Firefox, and WebKit projects depend on that setup and load the saved state before the checkout test runs. This makes the E2E scenario focus on shopping and checkout rather than repeating login steps.

The `.auth` folder is ignored by Git because storage-state files can contain session tokens. Run the normal commands (`npm test`, `npm run test:headed`, or the tagged E2E command) and Playwright automatically runs the setup first.

## API testing

`tests/api/posts.api.spec.js` tests the public JSONPlaceholder practice API directly with Playwright's `request` fixture. It demonstrates three essentials: a successful `GET` and response-contract assertion, a `404` negative case, and a `POST` with a JSON request body. No browser is launched for these tests.

Run the API suite with:

```bash
npm run test:api
```

The configured public API simulates writes; it does not create permanent records.

API files use the dedicated `api` project, so they run once rather than being repeated for every browser. Browser projects ignore files ending in `.api.spec.js`.

## Publish to GitHub

After creating an empty GitHub repository, run these commands in this folder:

```bash
git init
git add .
git commit -m "Create Playwright learning framework"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Do not commit `.env` files containing credentials. `.env` is already ignored.
