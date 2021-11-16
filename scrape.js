const puppeteer = require("puppeteer");
const Standings = require("./Scraper/ss.js");
const Email = require("./Utils/email.js");
const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv').config();


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.html').pipe(res)
})

server.listen(3000);
/**
 * Run Standings
 */
(async () => {
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      headless: false
    });

    page = await browser.newPage();

    const standings = await new Standings(browser, page).main();

    // Make sure to uncomment the email code if you want to test out the email functionality.
    // Just remember to add your e-mail credentials in utils/email first.

     await Email.send(
       `<ul style="list-style:none;">
         ${standings.map(
           ([team, points], i) => `<li>${i + 1}: ${team} ${points}</li>`
         )}
       </ul>`.replace(/\,/g, "")
     );
  } catch (error) {
     await Email.send(error.stack, true);
  }

  await browser.close();
})();
