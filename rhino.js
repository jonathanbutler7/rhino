const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.rhino.com/user/login');
  await page.type('#edit-name', 'rhinotest');
  await page.type('#edit-pass', process.env.RHINO_PASSWORD);

  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('#edit-submit'), // Clicking the link will indirectly cause a navigation
  ]);
  await page.goto('https://www.rhino.com/rhino-test');
  const text = await page.evaluate(() => document.querySelector('#textToScrape').textContent);
  console.log(text)
  // await page.screenshot({ path: 'myscreenshot.png' });
  await browser.close();
})();
