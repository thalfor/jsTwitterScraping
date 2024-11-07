//
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');
const { usernameLogin } = require('./routes/usernameLogin');
const { checkUserLogin } = require('./routes/checkUserLogin');
const { passwordLogin } = require('./routes/passwordLogin');

//const { exec } = require('child_process');
const { spawn } = require('child_process');
const path = require('path');


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
  
  //////////////////////////////////////////////////////////////////////////////////// work in progress
  //$x(`//div[@data-testid="tweetText"]`)[0].childNodes[1].childNodes[0].wholeText
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
  //////////////////////////////////////////////////////////////////////////////////// work in progress
  
  await browser.close();
  */
}
//loginX();


const pythonRun = () => {
  const filePath = path.resolve(__dirname, './python/index.py');
  const pythonProcess = spawn('python', [filePath], {
      env: { ...process.env, PATH: 'C:\Users\thale\anaconda3\python.exe' + process.env.PATH } // prepend venv PATH
  });

  pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
      console.log(`python process exited with code ${code}`);
  });
};
pythonRun();

//
/*
const pythonRun = () => {

  const pythonPath = '../../../../anaconda3/python.exe'
  const filePath = path.resolve(__dirname, './python/index.py');

  exec(`${pythonPath} ${filePath}`, (error, stdout, stderr) => {

    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

  });
}
*/