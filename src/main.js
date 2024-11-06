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

  const browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();  
  await page.goto(url);
  await setTimeout(3000);

  const pageUsernamePage = await usernameLogin(page);
  const pageCheckUserLogin = await checkUserLogin(pageUsernamePage);
  await passwordLogin(pageCheckUserLogin);

  async function navigateToPage (pageDestination, urlDestination) {
    await pageDestination.goto(urlDestination, { waitUntil: 'networkidle2' });
    await setTimeout(3000);
  }

  let urlScrap = 'https://x.com/markets'
  //await navigateToPage(page, urlScrap);
  await page.goto(urlScrap, { waitUntil: 'networkidle2' })
  await setTimeout(3000);

  await page.screenshot({ path: 'src/pageScrap.jpg' });

  await browser.close();
}

loginX();

//