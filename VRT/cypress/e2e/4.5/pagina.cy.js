describe("Pruebas de página", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("P014 - Crear nueva página", () => {
    // Given Abro Página
    cy.visit("/ghost/#/pages");
    cy.screenshot("P014-Paso1-PaginaDeEditor");

    // When click en el botón de nueva página
    cy.get("a.gh-btn-primary").contains("New page").click();
    cy.screenshot("P014-Paso1-1-ClickEnNuevaPagina");

    // And Lleno los campos de título
    cy.get('textarea[placeholder="Page Title"].gh-editor-title').type(
      "Nueva Página{enter}"
    );
    cy.wait(1000);
    cy.screenshot("P014-Paso2-LlenarTitulo");

    // And doy click en el botón de publicar
    cy.get("div.gh-publishmenu-trigger").contains("Publish").click();
    cy.screenshot("P014-Paso3-ClickEnPublicar");

    // And doy click en el botón de publicar ahora
    cy.get("button.gh-btn-black").contains("Publish").click();
    cy.screenshot("P014-Paso4-ClickEnPublicarAhora");

    // Then Debo ver mensaje "Published"
    cy.contains("Published");
    cy.screenshot("P014-Paso6-MensajeDePublicado");
  });

  it("P016 Eliminar página", () => {
    // Given Abro Página
    cy.visit("/ghost/#/pages");
    cy.screenshot("P016-Paso1-PaginaDeEditor");

    // When Hago click en la página a editar
    cy.contains("Nueva Página").click();
    cy.screenshot("P016-Paso2-ClickEnPagina");

    // And Hago click en el botón de opciones
    cy.get('button[title="Settings"]').click();
    cy.screenshot("P016-Paso3-ClickEnOpciones");

    // And Hago click en el botón de eliminar
    cy.get("button.settings-menu-delete-button")
      .contains("Delete page")
      .click();
    cy.screenshot("P016-Paso4-ClickEnEliminar");

    // And Hago click en el botón de confirmar
    cy.get("button.gh-btn-red").contains("Delete").click();
    cy.screenshot("P016-Paso5-ClickEnConfirmar");

    // Then No debe existitir la página"
    cy.contains("Nueva Página").should("not.exist");
    cy.screenshot("P016-Paso6-PaginaEliminada");
  });
});
