/// <reference types="cypress" />


describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://project-cupcake.netlify.app/');
  });

  it("search before create", ()=>{
    cy.get('input#search-bar')          
    .then($els => {
      expect($els.length).to.eq(1);
    })
    .type('myfood');
    cy.get('button#filter-btn').click();
    cy.get('div#recipe-cards').
      then($els => {
      expect($els.length).to.eq(1);
    });
  });

  
  it('create', ()=>{
    cy.get('button#create-recipe-btn').click();
    cy.wait(500);
    
    cy.get('input#input-name').type('myfood');
    cy.get('textarea#input-desc').type('this is some desc');
    cy.get('input#input-hours').type('1');
    cy.get('input#input-mins').type('30');
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[1]/div[6]/button').click();
    cy.get('input#input-tags1').type('1st tag');
    cy.xpath('//*[@id="ing-card"]/button').click();
    cy.get('input#input-ings1').type('1st ings');
    cy.xpath('//*[@id="step-card"]/button').click();
    cy.get('input#input-steps1').type('1st steps');
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
    cy.get('button#return-btn').click();
    // check if element is being saved
    cy.get('recipe-card#myfood').should('exist');
  });

  


});


describe('create one sample recipe', ()=>{
  beforeEach(() => {
    cy.visit('https://project-cupcake.netlify.app/');
    cy.get('button#create-recipe-btn').click();
    cy.wait(500);
    
    cy.get('input#input-name').type('myfood');
    cy.get('textarea#input-desc').type('this is some desc');
    cy.get('input#input-hours').type('1');
    cy.get('input#input-mins').type('30');
    /*
    cy.xpath('//*[@id="ing-card"]/button').click();
    cy.get('input#input-ings1').type('1st ings');
    cy.xpath('//*[@id="step-card"]/button').click();
    cy.get('input#input-steps1').type('1st steps');
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
    cy.get('button#return-btn').click();
    // check if element is being saved
    cy.get('recipe-card#myfood').should('exist');
    */
  });

  it('more tag', ()=>{

    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[1]/div[6]/button').click();
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[1]/div[6]/button').click();
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[1]/div[6]/button').click();
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[1]/div[6]/button').click(); 
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[1]/div[6]/button').click();
    cy.get('input#input-tags1').type('1st tag');
    cy.get('input#input-tags2').type('2nd tag');
    cy.get('input#input-tags3').type('3rd tag');
    cy.get('input#input-tags4').type('4th tag');
    cy.get('input#input-tags5').type('5th tag');
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
    cy.get('button#return-btn').click();
    
    //cy.get('recipe-card#myfood').children('div#')

  });

  it('more step', ()=>{
    cy.xpath('//*[@id="step-card"]/button').click();
    cy.get('input#input-steps1').type('1st steps');
    cy.xpath('//*[@id="step-card"]/button').click();
    cy.get('input#input-steps2').type('2nd steps');
    cy.xpath('//*[@id="step-card"]/button').click();
    cy.get('input#input-steps3').type('3rd steps');
    cy.xpath('//*[@id="step-card"]/button').click();
    cy.get('input#input-steps4').type('4th steps');
    cy.xpath('//*[@id="step-card"]/button').click();
    cy.get('input#input-steps5').type('5th steps');

    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
    cy.get('button#return-btn').click();
  });

  it('more ing', ()=>{
    cy.xpath('//*[@id="ing-card"]/button').click();
    cy.get('input#input-ings1').type('1st ings');
    cy.xpath('//*[@id="ing-card"]/button').click();
    cy.get('input#input-ings2').type('2nd ings');
    cy.xpath('//*[@id="ing-card"]/button').click();
    cy.get('input#input-ings3').type('3rd ings');
    cy.xpath('//*[@id="ing-card"]/button').click();
    cy.get('input#input-ings4').type('4th ings');
    cy.xpath('//*[@id="ing-card"]/button').click();
    cy.get('input#input-ings5').type('5th ings');

    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
    cy.get('button#return-btn').click();
    
  });

  /*
  it('large paragraph', ()=>{
    cy.get('textarea#input-desc').type('Chief Justice Roberts, Vice President Harris, Speaker Pelosi, Leader Schumer, Leader McConnell, Vice President Pence, distinguished guests, and my fellow Americans.This is America’s day. This is democracy’s day. A day of history and hope. Of renewal and resolve. Through a crucible for the ages America has been tested anew and America has risen to the challenge. Today, we celebrate the triumph not of a candidate, but of a cause, the cause of democracy. The will of the people has been heard and the will of the people has been heeded. We have learned again that democracy is precious. Democracy is fragile. And at this hour, my friends, democracy has prevailed. So now, on this hallowed ground where just days ago violence sought to shake this Capitol’s very foundation, we come together as one nation, under God, indivisible, to carry out the peaceful transfer of power as we have for more than two centuries. We look ahead in our uniquely American way – restless, bold, optimistic – and set our sights on the nation we know we can be and we must be. I thank my predecessors of both parties for their presence here. I thank them from the bottom of my heart. You know the resilience of our Constitution and the strength of our nation. As does President Carter, who I spoke to last night but who cannot be with us today, but whom we salute for his lifetime of service. I have just taken the sacred oath each of these patriots took — an oath first sworn by George Washington. But the American story depends not on any one of us, not on some of us, but on all of us. On “We the People” who seek a more perfect Union. This is a great nation and we are a good people. Over the centuries through storm and strife, in peace and in war, we have come so far. But we still have far to go. We will press forward with speed and urgency, for we have much to do in this winter of peril and possibility.');
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
    cy.get('button#return-btn').click();
  })

  it('no desc', ()=>{
    cy.get('textarea#input-desc').type('');
    cy.xpath('//*[@id="create-recipe--input-wrapper"]/div[3]/button[1]').click();
    cy.contains("Please add at least a recipe name to save the recipe.").should('exist');
    cy.get('button#return-btn').click();
  })*/

  it('add nutriton', ()=>{
    cy.xpath('//*[@id="input-calories"]').type('100');
    cy.xpath('//*[@id="input-carbs"]').type('100');
    cy.xpath('//*[@id="input-fat"]').type('100');
    cy.xpath('//*[@id="input-protein"]').type('100');
  });
});
