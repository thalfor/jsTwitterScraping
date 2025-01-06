//
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
  await setTimeout(4000);  
  
  const pageUsernamePage = await usernameLogin(page);
  const pageCheckUserLogin = await checkUserLogin(pageUsernamePage);
  await passwordLogin(pageCheckUserLogin);
  
  let urlScrap = 'https://x.com/markets'
  await page.goto(urlScrap, { waitUntil: 'networkidle2' })
  await setTimeout(3000);
  
  // instead of an array i'll use knex sql?
  const tweets = new Set();
  const maxTweets = 20;
  let i = 0;

  console.time(`execution time`);
  while (tweets.size <= maxTweets) {
    /*
    (if i'm using knex: check with knex if the next tweets that i'll get are already at the database, or with the set)
    */
    const tweetElements = await page.$$(`xpath/.//div[@data-testid='tweetText']`);
    for (const tweetElement of tweetElements) {
      const tweetText = await page.evaluate(e => e.innerText, tweetElement);
      tweets.add(tweetText);
    }

    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await setTimeout(3000);
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await setTimeout(3000);

    i++;
    console.log(`loop number ${i}`);

  }

  console.log([...tweets]);
  console.timeEnd(`execution time`);

  await browser.close();
}
loginX();
//