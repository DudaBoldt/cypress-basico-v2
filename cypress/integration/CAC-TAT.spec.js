// / <reference types="Cypress" />

import { delay } from "cypress/types/bluebird"

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulario', function(){
    cy.get('#firstName').type('Igor')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('email@legal.com')
    cy.get('#open-text-area').type('Quero um big mac')
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
  })
})
