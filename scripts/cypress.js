const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')
const yargs = require('yargs')

const { tags } = yargs.option('tags', {
    type: String,
    default: ['']
  }).argv;

cypress.run({
  env: `grepTags=${tags}`
}).then(
  () => {
    generateReport()
  },
  error => {
    generateReport()
    console.error(error)
    process.exit(1)
  }
)

function generateReport(options) {
  return merge(options).then(report => marge.create(report, options))
}
