const { test, expect } = require('../fixtures/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { sauceDemo } = require('../test-data/sauce-demo');

test.describe('Sauce Demo checkout', () => {
  test('a customer can buy one product @e2e', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('Sign in as a standard customer', async () => {
      await loginPage.open(sauceDemo.url);
      await loginPage.login(sauceDemo.user.username, sauceDemo.user.password);
      await expect(page).toHaveURL(/inventory.html/);
    });

    await test.step('Add the backpack to the cart', async () => {
      await inventoryPage.addProduct(sauceDemo.product.slug);
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await inventoryPage.openCart();
      await expect(cartPage.item(sauceDemo.product.name)).toBeVisible();
    });

    await test.step('Complete checkout', async () => {
      await cartPage.checkout();
      await checkoutPage.enterCustomerDetails(sauceDemo.customer);
      await checkoutPage.finishOrder();
    });

    await test.step('Confirm the order', async () => {
      await expect(page).toHaveURL(/checkout-complete.html/);
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });
  });
});
