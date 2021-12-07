/// <reference types="cypress" />

describe('update recipe', ()=>{
    beforeEach(() => {
      cy.visit('https://project-cupcake.netlify.app/');
      cy.get('button#create-recipe-btn').click();
      cy.wait(500);
      
      cy.get('input#input-name').type('myfood');
      cy.get('textarea#input-desc').type('this is some desc');
      cy.get('input#input-hours').type('1');
      cy.get('input#input-mins').type('30');
      cy.xpath('//*[@id="ing-card"]/button').click();
      cy.get('input#input-ings1').type('1st ings');
      cy.xpath('//*[@id="step-card"]/button').click();
      cy.get('input#input-steps1').type('1st steps');
      cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
      cy.get('button#return-btn').click();
      // check if element is being saved
      cy.get('recipe-card#myfood').should('exist');

      cy.get('button#create-recipe-btn').click();
      cy.get('input#input-name').type('myfood-delete');
      cy.get('textarea#input-desc').type('this is some desc');
      cy.get('input#input-hours').type('1');
      cy.get('input#input-mins').type('30');
      cy.xpath('//*[@id="ing-card"]/button').click();
      cy.get('input#input-ings1').type('1st ings');
      cy.xpath('//*[@id="step-card"]/button').click();
      cy.get('input#input-steps1').type('1st steps');
      cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
      cy.get('button#return-btn').click();
      cy.get('recipe-card#myfood-delete').should('exist');
    })
  
    it('delete', ()=>{
      cy.xpath('//*[@id="delete-btn"]').click();
      cy.xpath('//*[@id="myfood"]').should('be.visible');
      //cy.xpath('//*[@id="myfood"]//article').should('be.visible');
      
      //cy.xpath('//*[@id="delete-btn"]').click();
    })
    /*
    it('change name', ()=>{
  
    })
  
    it('change name', ()=>{
  
    })
  
    it('change name', ()=>{
  
    })
  
    it('change name', ()=>{
  
    })*/
  
  })