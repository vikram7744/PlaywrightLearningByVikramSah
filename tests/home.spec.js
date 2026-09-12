const { test, expect } = require('../fixtures/test');
const { documentationLinks } = require('../test-data/links');

test.describe('Playwright documentation home page', () => {
  test('shows the main heading @smoke', async ({ page, homePage }) => {
    await test.step('Open the documentation home page', async () => {
      await homePage.open();
    });

    await test.step('Check page identity', async () => {
      await expect(page).toHaveTitle(/Playwright/);
      await expect(page.getByRole('heading', { name: /Playwright enables reliable web automation/i })).toBeVisible();
    });
  });

  test('opens the installation guide @smoke', async ({ page, homePage }) => {
    await test.step('Navigate to the installation guide', async () => {
      await homePage.open();
      await homePage.goToInstallationGuide();
    });

    await test.step('Check the destination page', async () => {
      await expect(page).toHaveURL(new RegExp(documentationLinks.getStarted.urlFragment));
      await expect(page.getByRole('heading', { name: documentationLinks.getStarted.title })).toBeVisible();
    });
  });
});
