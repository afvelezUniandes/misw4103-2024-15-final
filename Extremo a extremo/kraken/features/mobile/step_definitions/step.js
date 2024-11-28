const { Given, When, Then } = require("@cucumber/cucumber");
const properties = require("../properties.json");

Given("Abro Ghost", async function () {
  const baseUrl = properties.BASE_URL;
  console.log("baseUrl", baseUrl);
  await this.driver.url(baseUrl + "/ghost/#/signin");
});

When("Inicio de sesión inválido", async function () {
  await this.driver
    .$('input[name="identification"]')
    .setValue("wrong@example.com");
  await this.driver.$('input[name="password"]').setValue("wrongpassword");
  await this.driver.$('button[type="submit"]').click();
});

When("Inicio de sesión válido", async function () {
  await this.driver
    .$('input[name="identification"]')
    .setValue(properties.USERNAME);
  await this.driver.$('input[name="password"]').setValue(properties.PASSWORD);
  await this.driver.$('button[type="submit"]').click();
});

Then("Debo ver mensaje {string}", async function (message) {
  const errorMessage = await this.driver.$("p.main-error").getText();
  return errorMessage;
});

Then("Debo ver el dashboard", async function () {
  const url = await this.driver.getUrl();
  return url;
});

When("Salgo de la sesión", async function () {
  await this.driver.$(".gh-user-avatar").click();
  await this.driver.$("a.user-menu-signout").click();
});

Then("Debo ver página de login", async function () {
  const url = await this.driver.getUrl();
  return url;
});
