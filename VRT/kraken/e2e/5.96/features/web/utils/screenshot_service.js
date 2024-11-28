const fs = require('fs');
const path = require('path');

class ScreenshotService {
    constructor(driver) {
        this.driver = driver;
        this.initializeDirectories();
    }

    initializeDirectories() {
        const currentDir = process.cwd();
        const baseScreenshotDir = path.join(currentDir, 'screenshots');
        const loginDir = path.join(baseScreenshotDir, 'login.feature');
        const postDir = path.join(baseScreenshotDir, 'post.feature');

        [baseScreenshotDir, loginDir, postDir].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    async takeScreenshot(functionality) {

        const currentDir = process.cwd();
        const baseScreenshotDir = path.join(currentDir, 'screenshots');
        const featureDir = this.getFeatureDirectory(functionality);
        const fileName = this.generateFileName(functionality);
        const screenshotDir = path.join(baseScreenshotDir, featureDir);
        const screenshotPath = path.join(screenshotDir, fileName);

        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }

        const screenshot = await this.driver.takeScreenshot();
        
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
    }

    getFeatureDirectory(functionality) {
        let featureDir;
        
        if (functionality.startsWith('login_') || functionality.includes('login')) {
            featureDir = 'login.feature';
        } else if (functionality.startsWith('post_') || functionality.includes('post')) {
            featureDir = 'post.feature';
        } else {
            featureDir = 'generic.feature';
        }
        return featureDir;
    }

    generateFileName(functionality) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${functionality}_${timestamp}.png`;
        return fileName;
    }
}

module.exports = ScreenshotService;