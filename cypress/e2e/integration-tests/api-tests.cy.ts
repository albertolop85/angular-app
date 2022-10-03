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

  it('Apply Command API Test', { tags: ['@api'] }, () => {

    let requestBody = { command: 'arr r5 14' }

    cy.request('POST', '/api/applyCommand', requestBody).then((Response) => {

      expect(Response.status).equal(200)
      expect(Response.body.appliedCommand).equal(requestBody.command)

      let size = Response.body.commands.length

      expect(Response.body.commands[size-1].command).equal(requestBody.command)
    })
  })

  it('Undo Command API Test', { tags: ['@api'] }, function() {

    cy.request('GET', '/api/getCommands').as('commands')

    cy.then(() => {

      let size = this['commands'].body.commands.length;
      let undoCommand = this['commands'].body.commands[size-1].command;

      cy.request('DELETE', '/api/undoCommand').then((Response) => {

        expect(Response.status).equal(200)
        expect(Response.body.undoCommand).equal(undoCommand)
        expect(Response.body.commands.length).equal(size-1)

        Array.from({length: size-1}, (value, key) => key).forEach(n => {
          expect(Response.body.commands[n].command).equal(this['commands'].body.commands[n].command)
        })

      })
    })


  })

})
