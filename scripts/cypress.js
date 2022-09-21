const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')
const yargs = require('yargs')
const allureHistory = require('./allure-history')

const { tags } = yargs.option('tags', {
    type: String,
    default: ['']
  }).argv;

cypress.run({
  env: `grepTags=${tags}`
}).then(
  () => {
    allureHistory.generate()
    generateReport()
  },
  error => {
    allureHistory.generate()
    generateReport()
    console.error(error)
    process.exit(1)
  }
)

function generateReport(options) {
  return merge(options).then(report => marge.create(report, options))
}
