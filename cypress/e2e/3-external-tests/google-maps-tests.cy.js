// My tets for a basic Google Maps Search

describe ('Google Maps Tests', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach (() => {
    cy.visit('https://maps.google.com')
  })

  it ('Google Map Route Search', () => {

    cy.log('Search for a place')
    cy.get('input#searchboxinput').click().type('Estadio Universitario Nuevo Leon');
    cy.get('button#searchbox-searchbutton').click();

    cy.log('Check place was found')
    cy.get('h1.fontHeadlineLarge span').contains('Estadio Universitario').should('be.visible');

    cy.log('Click on directions')
    cy.get('button[jsaction="pane.placeActions.directions;keydown:pane.placeActions.directions"]').click({ scrollBehavior: 'center' })

    cy.log('Type start of route')
    cy.get('div#directions-searchbox-0 input').type('Here')

    cy.log('Look for the route')
    cy.get('div#directions-searchbox-0 button[jsaction="search;focus:pane.focusTooltip;blur:pane.blurTooltip"]').click()
  })
})
