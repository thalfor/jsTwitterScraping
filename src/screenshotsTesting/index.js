//
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
//

// i'm setting a screenshot from the website that analyses if my bot has a "bot behavior"
// i saved two screenshots, with and without the stealth mode
// the Stealth mode really passed all the tests!

puppeteer.use(StealthPlugin());

url = 'https://bot.sannysoft.com';

const screenshotFunction = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  //await page.screenshot({ path: 'src/screenshotsTesting/withoutStealth.jpg' });
  await page.screenshot({ path: 'src/screenshotsTesting/withStealth.jpg' });
  await browser.close();
};

screenshotFunction();

//