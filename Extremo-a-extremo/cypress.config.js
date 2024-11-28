const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:2368",
    env: {
      username: "af.velezv1@uniandes.edu.co",
      password: "ABC1234abc",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
