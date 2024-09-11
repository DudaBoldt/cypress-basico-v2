Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
  cy.get('#firstName').type('Igor')
  cy.get('#lastName').type('Santos')
  cy.get('#email').type('email@legal.com')
  cy.get('#open-text-area').type('textoLongo')
  cy.contains('button', 'Enviar').click()
})