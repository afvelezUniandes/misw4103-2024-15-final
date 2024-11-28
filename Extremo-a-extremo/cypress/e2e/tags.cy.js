describe("Pruebas de tags", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("P011 - Crear nueva etiqueta", () => {
    cy.visit("/ghost/#/tags");
    cy.get('a[href="#/tags/new/"]').click(); // Navega a la página de creación de etiquetas
    cy.get('input[name="name"]').type("Nueva Etiqueta");
    cy.get('input[name="slug"]').type("nueva-etiqueta");
    cy.get('textarea[name="description"]').type(
      "Descripción de la nueva etiqueta"
    );
    cy.get('button[data-test-button="save"]').click();
    cy.contains("Saved");
  });

  it("P012 - Editar etiqueta existente", () => {
    cy.visit("/ghost/#/tags");
    cy.contains("Nueva Etiqueta").click();
    cy.get('input[name="name"]').clear().type("Etiqueta Editada");
    cy.get('button[data-test-button="save"]').click();
    cy.contains("Saved");
  });

  it("P013 - Eliminar etiqueta", () => {
    cy.visit("/ghost/#/tags");
    cy.contains("Etiqueta Editada").click();
    cy.get('button[data-test-button="delete-tag"]').click();
    cy.get('button[data-test-button="confirm"]').click();
    cy.contains("Etiqueta Editada").should("not.exist");
  });
});
