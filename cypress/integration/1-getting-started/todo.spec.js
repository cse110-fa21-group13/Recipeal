/// <reference types="cypress" />


describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://project-cupcake.netlify.app/')
  })

  it("search before create", ()=>{
    cy.get('input#search-bar')          
    .then($els => {
      expect($els.length).to.eq(1)    
    })
    .type('myfood');
    cy.get('button#filter-btn').click();
    cy.get('div#recipe-cards').
      then($els => {
      expect($els.length).to.eq(1)    
    })
  })

  
  it('create', ()=>{
    cy.get('button#create-recipe-btn').click();
    cy.wait(500);
    
    cy.get('input#input-name').type('myfood');
    cy.get('textarea#input-desc').type('this is some desc');
    cy.get('input#input-hours').type('1');
    cy.get('input#input-mins').type('30');
    cy.get('input#input-tags1').type('1st tag');
    cy.get('input#input-ings1').type('1st ings');
    cy.get('input#input-steps1').type('1st steps');
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
    cy.get('button#return-btn').click();
    // check if element is being saved
    cy.get('recipe-card#myfood').should('exist');
  })

  


})


describe('create one sample recipe', ()=>{
  beforeEach(() => {
    cy.visit('https://project-cupcake.netlify.app/');
    cy.get('button#create-recipe-btn').click();
    cy.wait(500);
    
    cy.get('input#input-name').type('myfood');
    cy.get('textarea#input-desc').type('this is some desc');
    cy.get('input#input-hours').type('1');
    cy.get('input#input-mins').type('30');
    cy.get('input#input-tags1').type('1st tag');
    cy.get('input#input-ings1').type('1st ings');
    cy.get('input#input-steps1').type('1st steps');
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
    cy.get('button#return-btn').click();
  })

  it('information saved correctly in create', ()=>{
    //cy.xpath('//*[@id="myfood"]//article/div[1]/div/h1').should('be.visible');
    
    //cy.get('recipe-card#myfood').children('div#')

  })




})