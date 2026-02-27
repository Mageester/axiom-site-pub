const { chromium } = require('playwright');
const path = require('path');

(async () => {
    try {
        console.log("Launching Chromium...");
        const browser = await chromium.launch();
        const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
        console.log("Navigating to https://hvac.getaxiom.ca...");
        await page.goto('https://hvac.getaxiom.ca', { waitUntil: 'networkidle' });

        const screenshotPath = path.join(__dirname, '../public/hvac-demo.png');
        console.log(`Saving screenshot to ${screenshotPath}...`);
        await page.screenshot({ path: screenshotPath });

        await browser.close();
        console.log("Screenshot automated successfully.");
    } catch (error) {
        console.error("Screenshot capture failed:", error);
        process.exit(1);
    }
})();
