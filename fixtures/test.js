const base = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

/**
 * Shared fixtures keep test setup in one place.
 * Import `test` from this file instead of directly from @playwright/test.
 */
const test = base.test.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  }
});

module.exports = { test, expect: base.expect };
