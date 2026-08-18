import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

  console.log('Navigating to http://127.0.0.1:3000...');
  try {
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle2', timeout: 15000 });
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot saved to screenshot.png');
  } catch (e) {
    console.error('Failed to navigate:', e);
    await page.screenshot({ path: 'screenshot_error.png' }).catch(() => {});
  }
  
  await browser.close();
})();
