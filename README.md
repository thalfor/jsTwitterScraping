# twitter (a.k.a. X) scraping

In this project i'll make an application that get specific users twittes while doing a sentiment analysis.
For this i need to check a few things:

[x] - Create a webscraping to recieve the data using or not existing libraries.<br />
[x] - Create a webscraping to recieve twittes.<br />
[x] - Store those tweets into a json file.<br />
[ ] - Execute python script in the javascript code.<br />
[ ] - Run a sentiment analysis using python.<br />

Sounds like very few steps but they are quite complex to do so.


## Motivation

Through all my career in finance one thing that was always present during almost all interactions with co-workers and also job related was: "how to determine the best investment for my portfolio?".<br />
That's a real complex question with a lot of answers that can be all true as well. But digging a little more into the question comes: "how to determine a specific stock market share to buy?". And that's where the motivation came.<br />
You see, to do this we have not only to analyse the specific company's results but how it behaves along the Government News, for the algorithm has to have this inputs to do the behavior analysis. And again another question: "how to analyse the news and where to get it?". And you got it, at least some will come from Twitter / X.

## Webscraping

For this i'll use Puppeteer to extract information, i'll also probably use puppeteer-extra-plugin-stealth for not looking like a bot. To test the stealth package i'll use the website "https://bot.sannysoft.com" that shows if the access have a "bot behavior".<br />
websites with important documentation: <br />
https://pptr.dev/guides/page-interactions#waitforselector<br />
https://github.com/puppeteer/puppeteer/pull/11782<br />
