it.only('testa a pagina da politica de privacidade de forma independente (arquivo separado)', function(){
  cy.visit('./src/privacy.html')

  cy.contains('Talking About Testing').should('be.visible')
})