describe('Basic user flow for Website', () => {
    // First, visit the app
    beforeAll(async () => {
      await page.goto('https://clever-ramanujan-0633a7.netlify.app/');
    });

    // sample test
    it('Initial Home Page - Check if is on the right page', async () => {
        console.log('Checking my recipes page');

        const pages = await page.$$('section');
        const homePage = await pages[1].getProperty('innerHTML');
        const homePageText = homePage['_remoteObject'].value;

        expect(homePageText).toContain('My recipes');
      });
  });
