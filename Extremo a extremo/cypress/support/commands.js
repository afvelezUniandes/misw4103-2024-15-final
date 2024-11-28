// Comando para inicio de sesión válido
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/ghost/#/signin");
  cy.get('input[name="identification"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/ghost/#/dashboard");
});

// Comando para cerrar sesión
Cypress.Commands.add("logout", () => {
  cy.get(".gh-user-avatar").click();
  cy.get("a.user-menu-signout").click();
  cy.url().should("include", "/ghost/#/signin");
});
