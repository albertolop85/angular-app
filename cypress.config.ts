import { defineConfig } from "cypress"

const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const envFile = require(`./cypress/env/${process.env['ENV']?.trim() || 'local'}.json`)

export default defineConfig({
  e2e: {
    baseUrl: envFile.baseUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    excludeSpecPattern: [
      "**/1-getting-started/*",
      "**/2-advanced-examples/*",
      "**/3-external-tests/*" ],
  },
  env: envFile,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true
  }
  /*
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-test-output.xml',
    toConsole: true
  }*/
});
