describe("Pruebas de inicio de sesión", () => {
  it("P001 - Inicio de sesión inválido", () => {
    cy.visit("/ghost/#/signin");
    cy.get('input[name="identification"]').type("wrong@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.contains("There is no user with that email address.");
  });

  it("P002 - Inicio de sesión válido", () => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.url().should("include", "/ghost/#/dashboard");
  });

  it("P003 - Logout de sesión válido", () => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.logout();
  });
});
