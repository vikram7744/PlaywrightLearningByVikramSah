class HomePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async open() {
    await this.page.goto('/');
  }

  async goToInstallationGuide() {
    await this.getStartedLink.click();
  }
}

module.exports = { HomePage };
