describe("Pruebas de inicio de sesión", () => {
  it("P002 - Inicio de sesión válido", () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");

    // Given Abro Ghost
    cy.visit("/ghost/#/signin");
    cy.screenshot("P002-Paso1-PaginaDeInicioSesion");

    // When Inicio de sesión válido
    cy.login(username, password);
    cy.screenshot("P002-Paso2-InicioSesionExitoso");

    // Then Debo ver el dashboard
    cy.url().should("include", "/ghost/#/dashboard");
    cy.screenshot("P002-Paso3-Dashboard");
  });

  it("P003 - Logout de sesión válido", () => {
    // Given Abro Ghost
    cy.visit("/ghost/#/signin");
    cy.screenshot("P003-Paso1-PaginaDeInicioSesion");

    // When Inicio de sesión válido
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.screenshot("P003-Paso2-InicioSesionExitoso");

    // Then Cierro sesión
    cy.logout();
    cy.screenshot("P003-Paso3-CerrarSesion");
  });
});
