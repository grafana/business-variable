import type { PluginOptions } from '@grafana/plugin-e2e';
import { defineConfig, devices } from '@playwright/test';
import { dirname } from 'node:path';

const pluginE2eAuth = `${dirname(require.resolve('@grafana/plugin-e2e'))}/auth`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<PluginOptions>({
  /**
   * Directory with tests
   */
  testDir: './test',

  /**
   * Run tests in files in parallel
   */
  fullyParallel: true,

  /**
   * Fail the build on CI if you accidentally left test.only in the source code.
   */
  forbidOnly: !!process.env.CI,

  /**
   * Retry on CI only.
   */
  retries: process.env.CI ? 2 : 0,

  /**
   * Reporter to use. See https://playwright.dev/docs/test-reporters
   */
  reporter: [['html', { open: 'never' }]],

  /**
   * Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
   */
  use: {
    /**
     * Base URL to use in actions like `await page.goto('/')`.
     */
    baseURL: process.env.GRAFANA_URL || 'http://localhost:3000',

    /**
     * Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer.
     */
    trace: 'on-first-retry',
  },

  /**
   * Configure projects for major browsers
   */
  projects: [
    {
      name: 'auth',
      testDir: pluginE2eAuth,
      testMatch: [/.*\.js/],
    },
    {
      name: 'run-tests',
      use: {
        ...devices['Desktop Chrome'],

        /**
         * @grafana/plugin-e2e writes the auth state to this file,
         * the path should not be modified
         */
        storageState: 'playwright/.auth/admin.json',
      },
      dependencies: ['auth'],
    },
  ],
});
