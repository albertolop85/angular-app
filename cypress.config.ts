import { defineConfig } from "cypress"

const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const registerCypressGrep = require('cypress-grep/src/plugin')

const envFile = require(`./cypress/env/${process.env['ENV']?.trim() || 'local'}.json`)

export default defineConfig({
  e2e: {
    baseUrl: envFile.baseUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      registerCypressGrep(config)
      allureWriter(on, config)
      return config
    },
    excludeSpecPattern: [
      "**/1-getting-started/*",
      "**/2-advanced-examples/*",
      "**/3-external-tests/*" ],
  },
  env: envFile,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  screenshotOnRunFailure: true,
  screenshotsFolder: "mochawesome-report/assets",
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true
  }
});
