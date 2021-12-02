describe('Basic user flow for Website', () => {
    // First, visit the app
    beforeAll(async () => {
      await page.goto('https://project-cupcake.netlify.app/');
    });

    // sample test
    it('Initial Home Page - Check if is on the right page', async () => {
        console.log('Checking my recipes page');

        const buttons = await page.$$('button');
        const myRecipeBtn = await buttons[0].getProperty('innerHTML');
        const exploreBtn = await buttons[1].getProperty('innerHTML');
        const text1 = myRecipeBtn['_remoteObject'].value;
        const text2 = exploreBtn['_remoteObject'].value;

        expect(text1).toContain('My Recipes');
        expect(text2).toContain('Explore');
      });
  });
