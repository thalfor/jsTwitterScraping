//
const { setTimeout } = require('node:timers/promises');
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function GettingData(maxTweetsForEachUrl,page) {      
    
      // function to manip the tweet timestamp
      const adjustDate = (tweetTimeStamp) => {
        const now = new Date();
        const months = {
          jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
          jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
        };
    
        // for timestamp like '10 min'
        if (/^\d+\s+[mM]in$/.test(tweetTimeStamp)) {
          const minutesAgo = parseInt(tweetTimeStamp.split(' ')[0], 10);
          const tweetDate = new Date();
    
          tweetDate.setMinutes(now.getMinutes() - minutesAgo);
          return tweetDate.toISOString();
        }
    
        // for timestamp like '6 h'
        if(/^\d+\s+[hH]$/.test(tweetTimeStamp)) {
          const hours = parseInt(tweetTimeStamp.split(' ')[0], 10);
          const tweetDate = new Date();
      
          tweetDate.setHours(now.getHours() - hours);
          return tweetDate.toISOString();
        }
    
        // for timestamp like '6 de jan' or '31 de dez de 2024'
        if (/^\d+\s+de\s+\w+(?:\s+de\s+\d+)?$/.test(tweetTimeStamp)) {
          const parts = tweetTimeStamp.split(' ');
          const day = parseInt(parts[0], 10);
          const month = months[parts[2].toLowerCase()];
          const year = parts.length === 5 ? parseInt(parts[4], 10) : now.getFullYear();
      
          const tweetDate = new Date(year, month, day);
          return tweetDate.toISOString();
        }
    
        // in case it doesn't follow any format above
        return tweetTimeStamp;
    
      }
    
    
      const tweets = new Set();
      let i = 0;
    
      console.time(`execution time`);
      while (tweets.size <= maxTweetsForEachUrl) {
    
        //chrome console: $x(`//div[@data-testid="tweetText"]`)[0].childNodes[1].childNodes[0].wholeText
        const tweetElements = await page.$$(`xpath/.//div[@data-testid='tweetText']`);
        //chrome console: $x(`//div[@data-testid="User-Name"]//time`)
        const dateElements = await page.$$(`xpath/.//div[@data-testid='User-Name']//time`);
    
        for (let i = 0; i < tweetElements.length; i++) {
          const tweetElement = tweetElements[i];
          const dateElement = dateElements[i];
    
          const tweetText = await page.evaluate(e => e.innerText, tweetElement);
          const tweetDate = await page.evaluate(e => e.innerText, dateElement);
    
          const formattedTweetDate = adjustDate(tweetDate);
    
          tweets.add(JSON.stringify({ text: tweetText, formattedTweetDate }));
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
    
      const tweetArray = [...tweets].map(tweet => JSON.parse(tweet));
      fs.writeFileSync('tweets.json', JSON.stringify(tweetArray, null, 2), 'utf-8');
      console.log(`tweets saved`);
    
      console.timeEnd(`execution time`);


}

module.exports.GettingData = GettingData;
//