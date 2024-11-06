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
  let page = await browser.newPage();  
  await page.goto(url);
  await setTimeout(3000);


  const pageUsernamePage = await usernameLogin(page);
  const pageCheckUserLogin = await checkUserLogin(pageUsernamePage);
  await passwordLogin(pageCheckUserLogin);


  let urlScrap = 'https://x.com/markets'
  await page.goto(urlScrap, { waitUntil: 'networkidle2' })
  await setTimeout(3000);

  //$x(`//div[@data-testid="tweetText"][0].childNodes[1].childNodes[0].wholeText`)
  const [tweetData] = await page.$$(`xpath/.//div[@data-testid='tweetText']`);
  console.log([tweetData]);
  /*
  if(tweetData.length > 0) {
    for (let i = 0; i < tweetData.lenght ; i++) {
      let tweets = await page.evaluate(e => e.innerText, tweetData[i]);
      console.log(tweets);
    }
  }
  
  await setTimeout(2000);
  */

  await browser.close();
}

loginX();
//