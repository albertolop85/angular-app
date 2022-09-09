// My tets for a basic Google Search

describe ('Google Tests', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach (() => {
    cy.visit('https://www.google.com')
  })

  it ('Google Search for Wikipedia', () => {

    cy.log('Search any term')
    cy.get('input[name="q"]').click().type('Gignac{enter}')

    cy.log('Check for Wikipedia result')
    cy.get('a').contains('Wikipedia').should('be.visible')

    cy.log('Click on link')
    cy.get('a').contains('Wikipedia').click()

    cy.log('Validate club')
    cy.get('table.infobox tr th').contains(/^Club$/).next().should('contain.text', 'Tigres UANL')
  })
})
