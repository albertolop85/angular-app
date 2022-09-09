require('@shelex/cypress-allure-plugin');

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('goToChainCommands', (commands: Array<string>) => {

  cy.visit('/commandLineEditor')

  commands.forEach((cmd) => {

    cy.allure().logStep('Entering command [' + cmd + ']')

    cy.get('[test-id="command-line-input"]').type(cmd)
    cy.get('[test-id="command-line-apply"]').click()

    cy.allure().logStep('Ensuring command [' + cmd + '] was added to history')

    cy.get('.cmd-line-history').children().last().should('have.text', cmd)
  })
})

Cypress.Commands.add('getCommandLineEditor', () => {
  return cy.window().should('have.property', 'CommandLineEditorComponent')
})

// IMPROVE THIS ONE LATER: https://glebbahmutov.com/blog/testing-angular-application-via-app-actions/
Cypress.Commands.add('applyCommand', (cmd: string) => {
  cy.getCommandLineEditor()
    .should('have.property', 'commandHistory')
    .then(commandHistory => {
      commandHistory.push(cmd)
    })
})
