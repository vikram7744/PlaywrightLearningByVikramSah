class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  productAddButton(productSlug) {
    return this.page.locator(`#add-to-cart-${productSlug}`);
  }

  async addProduct(productSlug) {
    await this.productAddButton(productSlug).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
