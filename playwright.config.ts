import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail CI if test.only is accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // CI stability: reduce parallel pressure
  workers: process.env.CI ? 2 : undefined,

  // Reporting
  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  // Global settings for all tests
  use: {
    // CI-safe navigation + action stability
    navigationTimeout: 60000,
    actionTimeout: 60000,

    // Better debugging on failures
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Helps with unstable demo sites in CI
    ignoreHTTPSErrors: true,

    // Optional: reduces flakiness with dynamic apps
    waitForLoadState: 'domcontentloaded',
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});