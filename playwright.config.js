const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
require('dotenv').config();

const sauceDemoAuthFile = path.join(__dirname, '.auth', 'sauce-demo-user.json');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://playwright.dev',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/
    },
    {
      name: 'chromium',
      testIgnore: [/.*\.api\.spec\.js/, /.*\.setup\.js/],
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: sauceDemoAuthFile }
    },
    {
      name: 'firefox',
      testIgnore: [/.*\.api\.spec\.js/, /.*\.setup\.js/],
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], storageState: sauceDemoAuthFile }
    },
    {
      name: 'webkit',
      testIgnore: [/.*\.api\.spec\.js/, /.*\.setup\.js/],
      dependencies: ['setup'],
      use: { ...devices['Desktop Safari'], storageState: sauceDemoAuthFile }
    },
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.js/,
      testIgnore: /.*\.setup\.js/
    }
  ]
});
