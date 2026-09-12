class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('#checkout');
  }

  item(name) {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
