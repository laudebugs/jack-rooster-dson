const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // navigate to first URL
  await page.goto('https://www.example.com');

  // click on button with class "primary button"
  await page.click('.primary.button');

  // navigate to second URL
  await page.waitForNavigation();

  await browser.close();
})();