describe("Pruebas de miembros", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("P017 - Crear miembro", () => {
    cy.visit("/ghost/#/members");
    cy.get('a[data-test-new-member-button="true"]').click();
    cy.get('input[name="name"]').type("Miembro Prueba");
    cy.get('input[name="email"]').type("miembro@example.com");
    cy.get("button.gh-btn-primary").click();
    cy.contains("Saved");
  });

  it("P018 - Editar miembro", () => {
    cy.visit("/ghost/#/members");
    cy.contains("Miembro Prueba").click();
    cy.get('input[name="name"]').clear().type("Miembro Editado");
    cy.get("button.gh-btn-primary").click();
    cy.contains("Saved");
  });

  it("P019 - Eliminar miembro", () => {
    cy.visit("/ghost/#/members");
    cy.contains("Miembro Editado").click();
    cy.get('button[data-test-button="member-actions"]').click();
    cy.get('button[data-test-button="delete-member"]').click();
    cy.get('button[data-test-button="confirm"]').click();
    cy.contains("Miembro Editado").should("not.exist");
  });
});
