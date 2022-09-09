const commandsList: Array<Array<string>> = require('../../fixtures/commands.json')

describe('Data Driven Commands Tests', () => {

  commandsList.forEach((commands) => {

    it('Chained Commands ' + commands.toString(), () => {

      cy.allure().feature('Command Line Editor').story("Apply Command").testID('CL-DD-01').owner('albertolop@gmail.com').tag('regression', 'command-line')

      cy.allure().logStep('Executing chained commands ' + commands.toString())
      cy.goToChainCommands(commands)
      cy.allure().logStep('Completed chained commands execution')
    })

  })

})
