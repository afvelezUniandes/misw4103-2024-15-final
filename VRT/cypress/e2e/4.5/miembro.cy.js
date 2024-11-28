describe("Pruebas de miembros", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("P017 - Crear miembro", () => {
    // Given Abro Miembros
    cy.visit("/ghost/#/members");
    cy.screenshot("P017-Paso1-PaginaDeMiembros");

    // When Hago click en el botón de nuevo miembro
    cy.get("a.gh-btn-primary.ember-view").contains("New member").click();
    cy.screenshot("P017-Paso2-ClickEnNuevoMiembro");

    // And Lleno los campos de nombre
    cy.get("input#member-name").type("Miembro Prueba");
    cy.screenshot("P017-Paso3-LlenarNombre");

    // And Lleno los campos de email
    cy.get('input[name="email"]').type("miembro@example.com");
    cy.screenshot("P017-Paso4-LlenarEmail");

    // And Hago click en el botón de guardar
    cy.get("button.gh-btn-primary").contains("Save").click();
    cy.screenshot("P017-Paso5-ClickEnGuardar");

    // And Navego a Miembros
    cy.visit("/ghost/#/members");
    cy.screenshot("P017-Paso6-PaginaDeMiembros");

    // Then Debo ver el miembro creado
    cy.contains("Miembro Prueba");
    cy.screenshot("P017-Paso7-MensajeDeGuardado");
  });

  it("P019 - Eliminar miembro", () => {
    // Given Abro Miembros
    cy.visit("/ghost/#/members");
    cy.screenshot("P019-Paso1-PaginaDeMiembros");

    // When Hago click en el miembro editado
    cy.contains("Miembro Prueba").click();
    cy.screenshot("P019-Paso2-ClickEnMiembro");

    // And Hago click en el botón de eliminar
    cy.get("button.gh-btn-red").contains("Delete member").click();
    cy.screenshot("P019-Paso4-ClickEnEliminar");

    // And Espero a que el modal de confirmación aparezca y sea visible
    cy.get("div.modal-footer").should("be.visible");
    cy.screenshot("P019-Paso4-1-ModalVisible");

    // And Hago click en el botón de confirmar
    cy.get("div.modal-footer button.gh-btn-red")
      .contains("Delete member")
      .click();
    cy.screenshot("P019-Paso5-ClickEnConfirmar");

    // Then No debe existitir el miembro
    cy.contains("Miembro Prueba").should("not.exist");
    cy.screenshot("P019-Paso6-MiembroEliminado");
  });
});
