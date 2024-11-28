describe("Pruebas de post", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("P004 - Crear nuevo post", () => {
    // Given Abro Post
    cy.visit("/ghost/#/editor/post");
    cy.screenshot("P004-Paso1-PaginaDeEditor");

    // When Lleno los campos de título
    cy.get('textarea[placeholder="Post Title"].gh-editor-title').type(
      "Nuevo Post{enter}"
    );
    cy.wait(1000);
    cy.screenshot("P004-Paso2-LlenarTitulo");

    // And doy click en el botón de publicar
    cy.get("div.gh-publishmenu-trigger").contains("Publish").click();
    cy.screenshot("P004-Paso3-ClickEnPublicar");

    // And doy click en el botón de publicar ahora
    cy.get("button.gh-btn-black").contains("Publish").click();
    cy.screenshot("P004-Paso4-ClickEnPublicarAhora");

    // Then Debo ver mensaje "Published"
    cy.contains("Published");
    cy.screenshot("P004-Paso6-MensajeDePublicado");
  });

  it("P006 - Eliminar post", () => {
    // Given Abro Post
    cy.visit("/ghost/#/posts");
    cy.screenshot("P006-Paso1-PaginaDePosts");

    // When Hago click en el post a editar
    cy.contains("Nuevo Post").click();
    cy.screenshot("P006-Paso2-ClickEnPost");

    // And Hago click en el botón de opciones
    cy.get('button[title="Settings"]').click();
    cy.screenshot("P006-Paso3-ClickEnOpciones");

    // And Hago click en el botón de eliminar
    cy.get("button.settings-menu-delete-button")
      .contains("Delete post")
      .click();
    cy.screenshot("P006-Paso4-ClickEnEliminar");

    // And Hago click en el botón de confirmar
    cy.get("button.gh-btn-red").contains("Delete").click();
    cy.screenshot("P006-Paso5-ClickEnConfirmar");

    // Then No debe existitir el post
    cy.contains("Nuevo Post").should("not.exist");
    cy.screenshot("P006-Paso6-PostEliminado");
  });
});
