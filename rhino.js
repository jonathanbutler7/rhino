const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.rhino.com/user/login');
  await page.screenshot({ path: 'myscreenshot.png' });
  await page.type('username', 'rhinotest')
  await page.type('password', '')
  await browser.close();
})();
