describe("Pruebas de tags", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("P011 - Crear nueva etiqueta", () => {
    // Given Abro Etiquetas
    cy.visit("/ghost/#/tags");
    cy.screenshot("P011-Paso1-PaginaDeEtiquetas");

    // When Doy click en el botón de nueva etiqueta
    cy.get('a[href="#/tags/new/"]').click();
    cy.screenshot("P011-Paso2-ClickEnNuevaEtiqueta");

    // And Lleno los campos de la nueva etiqueta
    cy.get("input#tag-name").type("Nueva Etiqueta");
    cy.screenshot("P011-Paso3-LlenarCampos");

    // And Doy click en el botón de guardar
    cy.get("input#tag-slug").type("nueva-etiqueta");
    cy.screenshot("P011-Paso4-LlenarSlug");

    // And Agrego una descripcion
    cy.get("textarea#tag-description").type("Descripción de la nueva etiqueta");
    cy.screenshot("P011-Paso5-LlenarDescripcion");

    // And Doy click en el botón de guardar
    cy.get("button.gh-btn-primary").contains("Save").click();
    cy.screenshot("P011-Paso6-ClickEnGuardar");

    // Then Debo ver mensaje "Saved"
    cy.contains("Saved");
    cy.screenshot("P011-Paso7-MensajeDeGuardado");
  });

  it("P013 - Eliminar etiqueta", () => {
    // Given Abro Etiquetas
    cy.visit("/ghost/#/tags");
    cy.screenshot("P013-Paso1-PaginaDeEtiquetas");

    // When Hago click en la etiqueta a editar
    cy.contains("Nueva Etiqueta").click();
    cy.screenshot("P013-Paso2-ClickEnEtiqueta");

    // And Hago click en el botón de eliminar
    cy.get("button.gh-btn-red").contains("Delete tag").click();
    cy.screenshot("P013-Paso3-ClickEnEliminarEtiqueta");

    // And Hago click en el botón de confirmar eliminar
    cy.get("div.modal-footer button.gh-btn-red").contains("Delete").click();
    cy.screenshot("P013-Paso4-ClickEnEliminar");

    // Then No debe existir la etiqueta
    cy.contains("Nueva Etiqueta").should("not.exist");
    cy.screenshot("P013-Paso5-EtiquetaEliminada");
  });
});
