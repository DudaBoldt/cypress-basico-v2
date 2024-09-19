/ <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000 //avança no tempo

  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  Cypress._.times(3, function() {
    it.only('preenche os campos obrigatórios e envia o formulario', function(){
      const textoLongo = 'Quero um big mac bem delicioso... Com a fome que eu to, comeria dois kkk'
      
      cy.clock() //congela o relogio
      
      cy.get('#firstName').type('Igor')
      cy.get('#lastName').type('Santos')
      cy.get('#email').type('email@legal.com')
      cy.get('#open-text-area').type(textoLongo, {delay: 0})
      cy.contains('button', 'Enviar').click()
  
      cy.get('.success').should('be.visible')
  
      cy.tick(THREE_SECONDS_IN_MS) 
  
      cy.get('.success').should('not.be.visible')
    })
  })

  it('exibe mensagem de erro ao enviar o formulário com um email com formatação inválida', function(){
    cy.clock() //congela o relogio

    cy.get('#firstName').type('Igor')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('emaillegal.com')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('Teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio.', function(){
    cy.get('#firstName').type('Igor')
    cy.get('#lastName').type('Santos')
    cy.get('#phone')
      .type('asdasdsad')
      .should('have.value', '')
    // cy.get('#phone').type('123456').should('have.value', '123456')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.clock()

    cy.get('#firstName').type('Igor')
    cy.get('#lastName').type('Santos')
    cy.get('#phone-checkbox').check()
    cy.get('#phone-checkbox').should('be.checked');
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('contain', 'Valide os campos obrigatórios!')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
    // cy.get('phone').type('').should('not.have.value')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName').type('Igor').should('have.value', 'Igor')
    cy.get('#lastName').type('Santos').should('have.value', 'Santos')
    cy.get('#phone').type('123456').should('have.value', '123456')
    // Começa a limpeza dos campos
    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.clock()
    
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    
    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    
    cy.get('.success').should('not.be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu indice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback', function(){
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
    .and('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function(radio){
      cy.wrap(radio).check()
      cy.wrap(radio).should('be.checked')
    })
  })

  it('Marca os dois checkboxes e depois desmarca o ultimo', function(){
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function(input){
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function(input){
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo usando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function(input){
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('Acessa a pagina da politica de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })

  
})
