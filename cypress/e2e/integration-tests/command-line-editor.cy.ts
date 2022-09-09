describe('Command Line Editor Tests', () => {

  beforeEach(() => {

    cy.allure().logStep('Going to Command Line Editor module')

    cy.visit('/commandLineEditor')

  })

  describe('Chained Commands', () => {

    it('Ring65 -> Att Ring5 Double Bond 7 (Button)', () => {

      cy.allure().feature("Command Line Editor").story("Apply Command").testID("CL-CC-1").owner('albertolop@gmail.com').tag('regression', 'smoke', 'command-line')

      cy.get('[test-id="command-line-input"]').type("g r65")
      cy.get('[test-id="command-line-apply"]').click()

      cy.get('[test-id="command-line-status-msg"]').should('have.text', 'Status: Command applied successfully')
      cy.get('[test-id="command-line-error-msg"]').should('not.exist')
      cy.get('.cmd-line-history').find('li').should('exist')
      cy.get('.cmd-line-history').children().should('have.length', 1)
      cy.get('.cmd-line-history').children().first().should('have.text', 'g r65')

      cy.get('[test-id="command-line-input"]').type('a r5 d 7')
      cy.get('[test-id="command-line-apply"]').click()

      cy.get('.cmd-line-history').children().should('have.length', 2)
      cy.get('.cmd-line-history').children().first().next().should('have.text', 'a r5 d 7')

    })

    it('Ring 65 -> Att Ring5 Double Bond 7 -> Ring6 13 14 (Enter)', () => {

      cy.allure().feature("Command Line Editor").story("Apply Command").testID("CL-CC-2").owner('albertolop@gmail.com').tag('regression', 'command-line')

      cy.allure().logStep('Entering command [g r65{enter}]')

      cy.get('[test-id="command-line-input"]').type("g r65{enter}")

      cy.allure().logStep('Validating command is added to history')

      cy.get('.cmd-line-history').find('li').should('exist')
      cy.get('.cmd-line-history').children().should('have.length', 1)
      cy.get('.cmd-line-history').children().last().should('have.text', 'g r65')

      cy.allure().logStep('Entering command [a r5 d 7{enter}]')

      cy.get('[test-id="command-line-input"]').type('a r5 d 7{enter}')

      cy.allure().logStep('Validating command is added to history')

      cy.get('.cmd-line-history').children().should('have.length', 2)
      cy.get('.cmd-line-history').children().last().should('have.text', 'a r5 d 7')

      cy.allure().logStep('Entering command [g r6 13 14{enter}]')

      cy.get('[test-id="command-line-input"]').type('g r6 13 14{enter}')

      cy.allure().logStep('Validating command is added to history')

      cy.get('.cmd-line-history').children().should('have.length', 3)
      cy.get('.cmd-line-history').children().last().should('have.text', 'g r6 13 14')
    })

  })

  describe('Undo Commands', () => {

    it('3 Chained Commands and 2 Undo', () => {

      cy.allure().feature("Command Line Editor").story("Undo Command").testID("CL-UC-1").owner('albertolop@gmail.com').tag('regression', 'command-line')

      cy.applyCommand("g r65");
      cy.applyCommand("a r5 d 7");
      cy.applyCommand("g r6 13 14");

      cy.get('[test-id="command-line-undo"]').click();

      cy.get('[test-id="command-line-status-msg"]').should('be.visible').and('have.text', 'Status: Undo applied successfully')
      cy.get('.cmd-line-history').children().should('have.length', 2)
      cy.get('.cmd-line-history').children().last().should('have.text', 'a r5 d 7')

      cy.get('[test-id="command-line-undo"]').click();

      cy.get('[test-id="command-line-status-msg"]').should('be.visible').and('have.text', 'Status: Undo applied successfully')
      cy.get('.cmd-line-history').children().should('have.length', 1)
      cy.get('.cmd-line-history').children().last().should('have.text', 'g r65')

    })

    it('2 Chained Commands and 2 Undo', () => {

      cy.allure().feature("Command Line Editor").story("Undo Command").testID("CL-UC-2").owner('albertolop@gmail.com').tag('regression', 'command-line')

      cy.get('[test-id="command-line-input"]').type("g r65{enter}")
      cy.get('[test-id="command-line-input"]').type('a r5 d 7{enter}')

      cy.get('.cmd-line-history').children().should('have.length', 2)
      cy.get('.cmd-line-history').children().last().should('have.text', 'a r5 d 7')

      cy.get('[test-id="command-line-undo"]').click();

      cy.get('.cmd-line-history').children().should('have.length', 1)
      cy.get('.cmd-line-history').children().last().should('have.text', 'g r65')

      cy.get('[test-id="command-line-undo"]').click();

      cy.get('[test-id="command-line-status-msg"]').should('be.visible').and('have.text', 'Status: Undo applied successfully')
      cy.get('[test-id="command-line-error-msg"]').should('not.exist')
      cy.get('.cmd-line-history').find('li').should('not.exist')
      cy.get('.cmd-line-history').should('not.have.descendants', '.cmd-line-history-elem')

    })

    it('1 Command and 2 Undo', () => {

      cy.allure().feature("Command Line Editor").story("Undo Command").testID("CL-UC-3").owner('albertolop@gmail.com').tag('regression', 'smoke', 'command-line')

      cy.get('[test-id="command-line-input"]').type("g r65{enter}")

      cy.get('.cmd-line-history').children().should('have.length', 1)
      cy.get('.cmd-line-history').children().last().should('have.text', 'g r65')

      cy.get('[test-id="command-line-undo"]').click();

      cy.get('.cmd-line-history').find('li').should('not.exist')
      cy.get('.cmd-line-history').should('not.have.descendants', '.cmd-line-history-elem')

      cy.get('[test-id="command-line-status-msg"]').should('be.visible').and('have.text', 'Status: Undo applied successfully')
      cy.get('[test-id="command-line-error-msg"]').should('not.exist')

      cy.get('[test-id="command-line-undo"]').click();

      cy.get('[test-id="command-line-status-msg"]').should('not.exist')
      cy.get('[test-id="command-line-error-msg"]').should('be.visible').and('have.text', 'Error: There are no more commands to undo').and('have.css', 'color', 'rgb(255, 0, 0)')

    })

  })

})
