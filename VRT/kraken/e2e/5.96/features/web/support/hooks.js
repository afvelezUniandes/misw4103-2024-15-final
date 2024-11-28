const { After, Before } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');
const ScreenshotService = require('../utils/screenshot_service');

Before(async function() {
  this.deviceClient = new WebClient('chrome', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  this.screenshotService = new ScreenshotService(this.driver);
})

After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});
