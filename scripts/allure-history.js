const fs = require('fs-extra');

const srcDir = './allure-report/history';
const destDir = './allure-results/history';

exports.generate = function() {

  try {

    // Copy files only if source folder already exist
    if (fs.existsSync(srcDir)) {

      // If destination folder doesn't exist, creates it
      if (fs.existsSync(srcDir)) {
        fs.mkdirSync(destDir, { recursive: true })
      }

      // Move history files
      fs.moveSync(srcDir, destDir, { overwrite: true })

      console.log('Moved history files from ' + srcDir + ' to ' + destDir)
    }

  } catch (err) {
    console.error(err)
  }
};

