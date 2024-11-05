//
const env = require('./env');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');
//const { usernameLogin } = require('./routes/usernameLogin');
//const { checkUserLogin } = require('./routes/checkUserLogin');
//const { passwordLogin } = require('./routes/passwordLogin');


puppeteer.use(StealthPlugin());

const url = 'https://x.com/i/flow/login'

const loginX = async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();  
  await page.goto(url);
  await setTimeout(3000);

  
  //usernameLogin(page);
  await page.waitForSelector(`xpath/.//input[@name='text']`); 
  const [inputLoginField] = await page.$$(`xpath/.//input[@name='text']`);
  await inputLoginField.type(env.USERNAMELOGIN);
  //await page.screenshot({ path: 'src/usernameFilled.jpg' });
  await page.keyboard.press('Enter');
  await setTimeout(2000);
  

  //checkUserLogin(page);
    // need to check if twitter asked me to put my username for security reasons
  //await page.screenshot({ path: 'src/whereAmI.jpg' });
  const checkingWhereAmI = await page.$$(`xpath/.//span[text()='Enter your phone number or username']`); 
  //console.log(checkingWhereAmI.length);
  if(checkingWhereAmI.length > 0){
    await page.waitForSelector(`xpath/.//input[@name='text']`); 
    const [inputUserField] = await page.$$(`xpath/.//input[@name='text']`);
    await inputUserField.type(env.USER);
    //await page.screenshot({ path: 'src/checkUserExistsPage.jpg' });
    await page.keyboard.press('Enter');
    await setTimeout(2000);
  }
  

  //passwordLogin(page);
  await page.waitForSelector(`xpath/.//input[@name='password']`); 
  const [inputPasswordField] = await page.$$(`xpath/.//input[@name='password']`);
  await inputPasswordField.type(env.PASSWORD);
  //await page.screenshot({ path: 'src/passwordFilled.jpg' });
  await page.keyboard.press('Enter');
  await setTimeout(5000);


  //await page.screenshot({ path: 'src/hackerman.jpg' });


  await browser.close();
}

loginX();

//