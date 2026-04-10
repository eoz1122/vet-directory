import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', error => console.error('BROWSER ERROR:', error.message));
    page.on('requestfailed', request => console.error('BROWSER REQUEST FAILED:', request.url(), request.failure()?.errorText));

    try {
        await page.goto('http://localhost:5174', { waitUntil: 'networkidle0', timeout: 10000 });
        const content = await page.content();
        console.log('HTML CONTENT LENGTH:', content.length);
        if (content.length < 1000) {
            console.log('HTML SNIPPET:', content.substring(0, 500));
        }
    } catch (e) {
        console.error('PUPPETEER ERROR:', e.message);
    } finally {
        await browser.close();
    }
})();
