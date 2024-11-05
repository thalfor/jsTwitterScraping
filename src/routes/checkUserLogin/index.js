//
const env = require('../../env');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');

puppeteer.use(StealthPlugin());


async function checkUserLogin(page) {

  // need to check if twitter asked me to put my username for security reasons
  //await page.screenshot({ path: 'src/routes/checkUserLogin/whereAmI.jpg' });
  const checkingWhereAmI = await page.$$(`xpath/.//span[text()='Enter your phone number or username']`); 
  //console.log(checkingWhereAmI.length);
  
  if(checkingWhereAmI.length > 0){
    await page.waitForSelector(`xpath/.//input[@name='text']`); 
    const [inputUserField] = await page.$$(`xpath/.//input[@name='text']`);
    await inputUserField.type(env.USER);
    //await page.screenshot({ path: 'src/routes/checkUserLogin/checkUserExistsPage.jpg' });
    await page.keyboard.press('Enter');
    await setTimeout(2000);
  }

};

module.exports.checkUserLogin = checkUserLogin;
//