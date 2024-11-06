//
const env = require('./env');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');
const { usernameLogin } = require('./routes/usernameLogin');
const { checkUserLogin } = require('./routes/checkUserLogin');
const { passwordLogin } = require('./routes/passwordLogin');

puppeteer.use(StealthPlugin());


const url = 'https://x.com/i/flow/login'

const loginX = async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();  
  await page.goto(url);
  await setTimeout(3000);

  const pageUsernamePage = await usernameLogin(page);
  const pageCheckUserLogin = await checkUserLogin(pageUsernamePage);
  await passwordLogin(pageCheckUserLogin);

  await browser.close();
}

loginX();

//