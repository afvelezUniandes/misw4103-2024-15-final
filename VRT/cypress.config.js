const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.GHOST_VERSION || "http://localhost:2368",
    env: {
      username: "a@a.com",
      password: "ABC1234abc",
    },

    screenshotsFolder:
      process.env.GHOST_VERSION === "http://localhost:3001"
        ? "cypress/screenshots/reference"
        : "cypress/screenshots/test",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
