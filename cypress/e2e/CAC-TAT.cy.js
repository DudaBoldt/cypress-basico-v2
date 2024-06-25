/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulario', function(){
    cy.get('#firstName').type('Igor', {delay: 100})
    cy.get('#lastName').type('Santos', {delay: 100})
    cy.get('#email').type('email@legal.com', {delay: 100})
    cy.get('#open-text-area').type('Quero um big mac bem delicioso... Com a fome que eu to, comeria dois kkk', {delay: 100})
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao enviar o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('Igor', {delay: 100})
    cy.get('#lastName').type('Santos', {delay: 100})
    cy.get('#email').type('emaillegal.com', {delay: 100})
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
  })

  it('Teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio.', function(){
    cy.get('#firstName').type('Igor', {delay: 100})
    cy.get('#lastName').type('Santos', {delay: 100})
    cy.get('#phone').type('asdasdsad').should('have.value', '')
    // cy.get('#phone').type('123456').should('have.value', '123456')
  })
})
