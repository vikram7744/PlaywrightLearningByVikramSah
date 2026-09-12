const sauceDemo = {
  url: process.env.DEMO_BASE_URL || 'https://www.saucedemo.com/',
  user: {
    username: process.env.DEMO_USERNAME || 'standard_user',
    password: process.env.DEMO_PASSWORD || 'secret_sauce'
  },
  product: {
    name: 'Sauce Labs Backpack',
    slug: 'sauce-labs-backpack'
  },
  customer: {
    firstName: 'Playwright',
    lastName: 'Learner',
    postalCode: '560001'
  }
};

module.exports = { sauceDemo };
