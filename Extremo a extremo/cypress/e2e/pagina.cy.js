describe("Pruebas de página", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("P014 - Crear nueva página", () => {
    cy.visit("/ghost/#/editor/page");
    cy.get("textarea[data-test-editor-title-input]").type(
      "Nueva Página{enter}"
    );
    cy.wait(1000);
    cy.get('button[data-test-button="publish-flow"]')
      .contains("Publish")
      .click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get('button[data-test-button="confirm-publish"]').click();
    cy.contains("Published");
  });

  it("P015 - Editar página existente", () => {
    cy.visit("/ghost/#/pages");
    cy.contains("Nueva Página").click();
    cy.get("textarea[data-test-editor-title-input]")
      .clear()
      .type("Página Editada{enter}");
    cy.wait(1000);
    cy.get('button[data-test-button="publish-save"]')
      .contains("Update")
      .click();
    cy.contains("Published");
  });

  it("P016 Eliminar página", () => {
    cy.visit("/ghost/#/pages");
    cy.contains("Página Editada").click();
    cy.get("button[data-test-psm-trigger]").click();
    cy.get('button[data-test-button="delete-post"]').click();
    cy.get('button[data-test-button="delete-post-confirm"]').click();
    cy.contains("Página Editada").should("not.exist");
  });
});
