//
const env = require('../../env');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');

puppeteer.use(StealthPlugin());


async function checkUserLogin(page) {

  console.log(`Now at checkingUser`);
  const checkingWhereAmI = await page.$$(`xpath/.//span[text()='Enter your phone number or username']`); 
  
  if(checkingWhereAmI.length > 0){
    await page.waitForSelector(`xpath/.//input[@name='text']`); 
    const [inputUserField] = await page.$$(`xpath/.//input[@name='text']`);
    await inputUserField.type(env.USERNAME);
    await page.keyboard.press('Enter');
    await setTimeout(2000);
    
    return page;
  }
  
};

module.exports.checkUserLogin = checkUserLogin;
//
//
//
// need to check if twitter asked me to put my username for security reasons
//await page.screenshot({ path: 'src/routes/checkUserLogin/whereAmI.jpg' });
//console.log(checkingWhereAmI.length);
//await page.screenshot({ path: 'src/routes/checkUserLogin/checkUserExistsPage.jpg' });