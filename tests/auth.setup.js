const fs = require('fs');
const path = require('path');
const { test, expect } = require('../fixtures/test');
const { LoginPage } = require('../pages/LoginPage');
const { sauceDemo } = require('../test-data/sauce-demo');

const authFile = path.join(__dirname, '..', '.auth', 'sauce-demo-user.json');

test('authenticate the Sauce Demo user @auth @smoke @e2e', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open(sauceDemo.url);
  await loginPage.login(sauceDemo.user.username, sauceDemo.user.password);
  await expect(page).toHaveURL(/inventory.html/);

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
