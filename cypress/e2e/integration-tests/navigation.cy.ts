describe('Navigation Tests', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Validate Home page when application opens', { tags: ['@regression', '@navigation', '@smoke'] }, () => {

    cy.allure().feature('Navigation').testID('NT-01').owner('albertolop@gmail.com').tag('regression', 'smoke', 'navigation')

    cy.url().should('include', '/home')
    cy.get('h1[test-id="show-menu-text"]').should('have.text', 'Structure Editor Modules').and('be.visible')
    cy.get('app-home > h1').should('contain.text', 'Structure Editor').and('be.visible')
    cy.get('[test-id="top-menu-home-link"]').should('have.text', 'Return Home').and('be.visible')

  })

  it('Validate navigation to Command Line Editor', { tags: ['@regression', '@navigation'] }, () => {

    cy.allure().feature('Navigation').testID('NT-02').owner('albertolop@gmail.com').tag('regression', 'navigation')

    cy.get('[test-id="show-menu-button"]').click()
    cy.get('[test-id="menu-option-command-line"]').should('be.visible').and('have.text', 'Command Line Editor').click()

    cy.url().should('include', '/commandLineEditor')
    cy.get('.column-editor > h3').should('be.visible').and('have.text', 'Command Line Editor')
    cy.get('.cmd-line-status > h3').should('be.visible').and('have.text', 'Status and History')
    cy.get('.column-canvas > h3').should('be.visible').and('have.text', 'Molecule Viewer')

    cy.get('.cmd-line-editor > label').should('be.visible').and('have.text', 'Commands')
    cy.get('[test-id="command-line-input"]').should('be.visible').and('have.value', '')
    cy.get('[test-id="command-line-apply"]').should('be.visible').and('be.enabled').and('have.text', 'Apply')
    cy.get('[test-id="command-line-undo"]').should('be.visible').and('be.enabled').and('have.text', 'Undo')
    cy.get('[test-id="command-line-redo"]').should('be.visible').and('be.enabled').and('have.text', 'Redo')

    cy.get('[test-id="command-line-status-msg"]').should('have.text', 'Status: ')
    cy.get('.cmd-line-history').find('li').should('not.exist')

  })

  it('Validate navigation to Molecular Weight', { tags: ['@regression', '@navigation'] }, () => {

    cy.allure().feature('Navigation').testID('NT-03').owner('albertolop@gmail.com').tag('regression', 'navigation')

    cy.get('[test-id="show-menu-button"]').click()
    cy.get('[test-id="menu-option-molecular"]').should('be.visible').and('have.text', 'Molecular Weight Calculator').click()
    cy.url().should('include', '/molecularWeight')
    cy.get('app-molecular-weight > h3').should('be.visible').and('have.text', 'Molecular Weight Calculator')

  })

  it('Validate navigation to Batch Model & Change', { tags: ['@regression', '@navigation'] }, () => {

    cy.allure().feature('Navigation').testID('NT-04').owner('albertolop@gmail.com').tag('regression', 'navigation')

    cy.get('[test-id="show-menu-button"]').click()
    cy.get('[test-id="menu-option-batch"]').should('be.visible').and('have.text', 'Batch Moel & Change').click()
    cy.url().should('include', '/batchModel')
    cy.get('app-batch-model-change > h3').should('be.visible').and('have.text', 'Batch Model & Change')

  })

})
