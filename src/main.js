//
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');

const { usernameLogin } = require('./routes/usernameLogin');
const { checkUserLogin } = require('./routes/checkUserLogin');
const { passwordLogin } = require('./routes/passwordLogin');
const { GettingData } = require('./routes/gettingData');

puppeteer.use(StealthPlugin());


const url = 'https://x.com/i/flow/login'

const loginX = async () => {
  const browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();
  await page.goto(url);
  await setTimeout(4000);
  
  //login process
  const pageUsernamePage = await usernameLogin(page);
  const pageCheckUserLogin = await checkUserLogin(pageUsernamePage);
  await passwordLogin(pageCheckUserLogin);
  
  //getting data process
  const maxTweets = 5;
  let urlScrap = ['https://x.com/markets']
  for (elementUrlScrap of urlScrap) {
    await page.goto(elementUrlScrap, { waitUntil: 'networkidle2' })
    await setTimeout(3000);
    await GettingData(maxTweets, page);
  }

  
  await browser.close();
}
loginX();
//