const { Given, When, Then } = require("@cucumber/cucumber");
const path = require('path');
const properties = require(path.join(__dirname, '../../../properties.json'));

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

/* INICIO LISTADO DE STEPS GENERALES */

When('I enter email {kraken-string}', async function (email) {
  let element = await this.driver.$('#identification');
  return await element.setValue(email);
});
When('I enter password {kraken-string}', async function (password) {
  let element = await this.driver.$('#password');
  return await element.setValue(password);
});
When('I click next', async function() {
  let element = await this.driver.$('#ember5');
  return await element.click();
})

When(/^I click on the link with text "([^"]*)"$/, async function (linkText) {
  await this.driver.pause(1000); 
  
  let element;
  switch(linkText) {
      case "Posts":
          element = await this.driver.$('[data-test-nav="posts"]');
          break;
      case "obtener primer post":
          element = await this.driver.$('.gh-posts-list-item-group .gh-posts-list-item a.gh-list-data.gh-post-list-title');
          break;
      case "obtener primer draft":
          element = await this.driver.$('.gh-post-list-plain-status:has(.draft) a.gh-list-data.gh-post-list-title');
          break;
      case "draft Posts":
          element = await this.driver.$('[data-test-selected="drafts"]');
          break;
      case "opciones posts":
          element = await this.driver.$('.settings-menu-toggle');
          break;
      case "eliminar post modal": 
          element = await this.driver.$('[data-test-button="delete-post"]');
          break; 
      case "eliminar post": 
          element = await this.driver.$('[data-test-button="delete-post-confirm"]'); 
          break; 
      case "Update":
          element = await this.driver.$('[data-test-button="publish-save"]');
          break;
      case "Publish":
          element = await this.driver.$('.gh-publish-trigger');
          break;
      case "Continue, final review":
          element = await this.driver.$('[data-test-button="continue"]');
          break;
      case "Publish post, right now":
          element = await this.driver.$('[data-test-button="confirm-publish"]');
          break;
      case "Ver preview post":
          element = await this.driver.$('[data-test-button="publish-preview"]');
          break;
      case "opciones de cuando publicar":
          element = await this.driver.$('[data-test-setting="publish-at"] button');
          break;
      case "programar para publicar luego":
          element = await this.driver.$('.gh-publish-schedule .gh-radio:last-child');
          break;
      case "Nueva pagina":
          element = await this.driver.$('[data-test-new-page-button]');
          break;
      case "Publish pagina":
          element = await this.driver.$('[data-test-button="publish-flow"]');
          break;
      case "Continue, final review pagina":
          element = await this.driver.$('[data-test-button="continue"]');
          break;
      case "Publish page, right now pagina":
          element = await this.driver.$('[data-test-button="confirm-publish"]');
          break;
      default:
          const postMatch = linkText.match(/^obtener post (.+)$/);
          if (postMatch) {
              const postTitle = postMatch[1];
              const posts = await this.driver.$$('.gh-posts-list-item');
              
              for (const post of posts) {
                  const titleElement = await post.$('.gh-content-entry-title');
                  const titleText = await titleElement.getText();
                  
                  if (titleText.trim() === postTitle) {
                      element = await post.$('a.gh-list-data.gh-post-list-title');
                      break;
                  }
              }
              
              if (!element) {
                  throw new Error(`No se encontró el post con título "${postTitle}"`);
              }
          } else {
              element = await this.driver.$(`//*[contains(text(), "${linkText}")]`);
          }
  }

  if (!element) {
      throw new Error(`No se pudo encontrar el elemento con el texto "${linkText}"`);
  }

  await element.waitForClickable({ timeout: 5000 });
  return await element.click();
});

/* FIN LISTADO DE STEPS DE STEPS GENERALES */

/*---------------STEPS PARA POSTS------------------------------
/*----------Creacion de Post---------------------*/
When('I enter post name {kraken-string}', async function (post) {
  let element = await this.driver.$('textarea[placeholder="Post title"]');
  return await element.setValue(post);
});
When('I enter post description {kraken-string}', async function (description) {
  let element = await this.driver.$('div[contenteditable="true"]');
  return await element.setValue(description);
});

When('I click settings', async function() {
  let element = await this.driver.$('.settings-menu-toggle');
  return await element.click();
})

/*----------------validacion que los post esten en el listado de Posts---------------*/
When(/^the post "([^"]*)" should be present in the post list$/, async function (postName) {
  await this.driver.pause(2000);

  const posts = await this.driver.$$('.gh-content-entry-title');
  
  let found = false;
  for (const post of await posts) {
    const titleText = await post.getText();
    if (titleText.trim() === postName) {
      found = true;
      break;
    }
  }
  
  if (!found) {
    throw new Error(`El post "${postName}" no está presente en la lista.`);
  }
  
  return true;
});

When('And I click Publish', async function () {
  let element = await this.driver.$("//button/span[text()='Publish']");
  return await element.click();
});

Then(/^the post "([^"]*)" should not be present in the post list$/, async function (postName) {
  await this.driver.pause(1000);
  
  const postsList = await this.driver.$$('.gh-posts-list-item');
  
  const postsPresent = await Promise.all(postsList.map(async (post) => {
      const titleElement = await post.$('.gh-content-entry-title');
      const titleText = await titleElement.getText();
      return titleText === postName;
  }));
  
  if (postsPresent.includes(true)) {
      throw new Error(`El post "${postName}" todavía está presente en la lista cuando debería haber sido eliminado.`);
  }

  return true;
});

Then(/^I should see the preview title "([^"]*)"$/, async function (expectedTitle) {
  await this.driver.pause(2000);
  
  const iframe = await this.driver.$('.gh-pe-iframe');
  await this.driver.switchToFrame(iframe);
  
  try {
      const titleElement = await this.driver.$('h1.gh-article-title.is-title');
      const actualTitle = await titleElement.getText();
      
      if (actualTitle !== expectedTitle) {
          throw new Error(`El título en el preview "${actualTitle}" no coincide con el esperado "${expectedTitle}"`);
      }
  } finally {
      await this.driver.switchToParentFrame();
  }
  
  return true;
});

When(/^the post "([^"]*)" should be present in the post schedule list$/, async function (postName) {
  await this.driver.pause(2000);

  const posts = await this.driver.$$('.gh-posts-list-item-group .gh-content-entry-title');

  const titlesFound = await Promise.all(posts.map(async (titleElement) => {
      const titleText = await titleElement.getText();
      return titleText === postName;
  }));

  if (!titlesFound.includes(true)) {
      throw new Error(`El post "${postName}" no está presente en la lista.`);
  }

  return true;
});


/* FIN LISTADO DE STEPS PARA FUNCIONALIDAD DE POSTS*/ 

/*---------------STEPS PARA PAGES------------------------------
/*----------Creacion de Pages---------------------*/

When('I enter page name {kraken-string}', async function (pageName) {
  let element = await this.driver.$('textarea[data-test-editor-title-input]');
  return await element.setValue(pageName);
});

When('I enter page description {kraken-string}', async function (description) {
  let element = await this.driver.$('.kg-prose[contenteditable="true"]');
  return await element.setValue(description);
});

/*----------------validacion que los post esten en el listado de Posts---------------*/
Then(/^the page "([^"]*)" should be present in the page list$/, async function (pageName) {
  await this.driver.pause(2000);

  const pages = await this.driver.$$('.gh-list-row h3.gh-content-entry-title');

  const pagesFound = await Promise.all(pages.map(async (titleElement) => {
      const titleText = await titleElement.getText();
      return titleText === pageName;
  }));

  if (!pagesFound.includes(true)) {
      throw new Error(`La página "${pageName}" no está presente en la lista.`);
  }

  return true;
});
/* FIN LISTADO DE STEPS PARA FUNCIONALIDAD DE PAGES*/ 