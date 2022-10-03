describe('API Tests', () => {

  it('Get Commands Text API Test', { tags: ['@api'] }, () => {

    cy.request('GET', '/api/getCommandsText').then((Response) => {
      expect(Response.status).equal(200)
      expect(Response.body).equal('Get Commands')
    })

  })

  it('Get Commands API Test', { tags: ['@api'] }, () => {

    cy.request('GET', '/api/getCommands').then((Response) => {

      expect(Response.status).equal(200)
      expect(Response.body.type).equal('commandsList')
      expect(Response.body.commands).to.have.lengthOf(3)
      expect(Response.body.commands[0].command).equal('g r56')

      cy.wrap(Response.body.commands[0].command).as('firstCommand')
    })

    cy.get('@firstCommand').should('eq', 'g r56')
  })

  it('Get Commands Wrap API Test', { tags: ['@api'] }, () => {

    cy.request('GET', '/api/getCommands').then(Response => cy.wrap(Response.body).as('getCommandsResponse'))

    console.log(cy.get('@getCommandsResponse'))

    cy.get('@getCommandsResponse').should('have.property', 'type').should('eq', 'commandsList')
    cy.get('@getCommandsResponse').should('have.property', 'commands').should('have.lengthOf', 3)
  })

})
