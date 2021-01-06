const puppeteer = require('puppeteer');
const { RHINO_LOGIN, RHINO_PASSWORD, RHINO_TESTURL } = process.env;
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.rhino.com/user/login');
  await page.type('#edit-name', RHINO_LOGIN);
  await page.type('#edit-pass', RHINO_PASSWORD);

  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('#edit-submit'), // Clicking the link will indirectly cause a navigation
  ]);
  await page.goto(RHINO_TESTURL);
  const text = await page.evaluate(
    () => document.querySelector('#textToScrape').textContent
  );
  fs.writeFileSync('scraped.txt', text);
  await browser.close();
})();
