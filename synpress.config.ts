import synpressPlugins from "@synthetixio/synpress/plugins";
import { defineConfig } from "cypress";

const setupNodeEvents = (on, config) => {
  synpressPlugins(on, config);
  return config;
};
export default defineConfig({
  userAgent: "synpress",
  retries: {
    runMode: 0,
    openMode: 0,
  },
  screenshotsFolder: "./__tests__/drivers/synpress/screenshots",
  videosFolder: "./__tests__/drivers/synpress/videos",
  fixturesFolder: "./__tests__/drivers/synpress/fixtures",
  video: true,
  chromeWebSecurity: true,
  viewportWidth: 1366,
  viewportHeight: 850,
  env: {
    coverage: false,
  },
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  e2e: {
    setupNodeEvents,
    baseUrl: "http://localhost:5173/",
    specPattern: "./__tests__/drivers/synpress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "./__tests__/drivers/synpress/support/index.ts",
  },
  component: {
    setupNodeEvents() {},
    specPattern: "./**/*cy.{js,jsx,ts,tsx}",
    devServer: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      command: "npm run start",
      port: 3000,
      launchTimeout: 30000,
    },
  },
});
