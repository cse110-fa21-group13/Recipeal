describe('Basic user flow for Website', () => {
    // First, visit the app
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/source/client/index.html');
    });

    // sample test
    it('Initial Home Page - Check if is on the right page', async () => {
        console.log('Checking page title');

        const myRecipesButtons = await page.$$('button');
        const btnclass1 = await myRecipesButtons[0].getProperty('innerHTML');
        const btnclass2 = await myRecipesButtons[1].getProperty('innerHTML');
        const text1 = btnclass1['_remoteObject'].value;
        const text2 = btnclass2['_remoteObject'].value;

        //const classText = await myRecipesButtons[0].getProperty('class');
        //console.log(classText['_remoteObject']);
        expect(text1).toBe('My Recipes');
        expect(text2).toBe('Explore');
      });
  
    
  });