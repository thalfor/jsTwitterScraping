//
const env = require('../../env');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');

puppeteer.use(StealthPlugin());


async function emailLogin(page) {

  console.log(`Now at login`);
  await page.waitForSelector(`xpath/.//input[@name='text']`); 
  const [inputLoginField] = await page.$$(`xpath/.//input[@name='text']`);
  await inputLoginField.type(env.EMAILLOGIN);
  await page.keyboard.press('Enter');
  await setTimeout(2000);
  
  return page;
};

module.exports.emailLogin = emailLogin;
//
//
//
//await page.screenshot({ path: 'src/routes/usernameLogin/usernameFilled.jpg' });