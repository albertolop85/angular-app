import "cypress-real-events/support";

describe('Special Actions Tests', () => {

  describe('Key Combinations', () => {

    it('Test Focused CTRL + C -> CTRL + V ', { tags: ['@regression', '@ui-regression', '@ui-special-actions'] }, () => {

      cy.allure().feature("Special Actions").story("Key Combinations").testID("SA-KC-1").owner('albertolop@gmail.com').tag('regression', 'smoke', 'command-line')

      cy.visit('/commandLineEditor')

      cy.get('[test-id="command-line-input"]').type('aaa').type('{selectall}')
      cy.realPress(["Control", "C"])
      cy.get('[test-id="command-line-input"]').clear()
      cy.get('[test-id="command-line-input"]').realPress(["Control", "V"]).realPress(["Control", "V"]).realPress(["Control", "V"])
      cy.get('[test-id="command-line-apply"]').click()

      cy.get('.cmd-line-history').find('li').should('exist')
      cy.get('.cmd-line-history').children().should('have.length', 1)
      cy.get('.cmd-line-history').children().first().should('have.text', 'aaaaaaaaa')
    })

    // STILL NOT WORKING
    it('Test Not Focused CTRL + C -> CTRL + V ', { tags: ['@regression', '@ui-regression', '@ui-special-actions'], scrollBehavior: false }, () => {

      cy.allure().feature("Special Actions").story("Key Combinations").testID("SA-KC-1").owner('albertolop@gmail.com').tag('regression', 'smoke', 'command-line')

      cy.visit('/commandLineEditor')

      cy.get('div.column-canvas h3').realClick({ clickCount: 3 , position: "center"})
      cy.realPress(["Control", "C"])
      cy.get('[test-id="command-line-input"]').realPress(["Control", "V"])
      cy.get('[test-id="command-line-apply"]').click()

      cy.get('.cmd-line-history').find('li').should('exist')
      cy.get('.cmd-line-history').children().should('have.length', 1)
      cy.get('.cmd-line-history').children().first().should('have.text', 'aaaaaaaaa')
    })

  })

})
