describe("Los estudiantes under monkeys", function () {
  it("visits los estudiantes and survives monkeys", function () {
    cy.visit("https://losestudiantes.co");
    cy.wait(1000);
    // randomClick(10);
    randomEvent(10);
  });
});
function randomClick(monkeysLeft) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var monkeysLeft = monkeysLeft;
  if (monkeysLeft > 0) {
    cy.get("a").then(($links) => {
      var randomLink = $links.get(getRandomInt(0, $links.length));
      if (!Cypress.dom.isHidden(randomLink)) {
        cy.wrap(randomLink).click({ force: true });
        monkeysLeft = monkeysLeft - 1;
      }
      cy.wait(1000);
      randomClick(monkeysLeft);
    });
  }
}

function randomEvent(eventsLeft) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var eventsLeft = eventsLeft;
  if (eventsLeft > 0) {
    var eventType = getRandomInt(0, 4); // 0: click link, 1: texto, 2: seleccionar opcion, 3: click boton

    switch (eventType) {
      case 0:
        cy.get("a").then(($links) => {
          var randomLink = $links.get(getRandomInt(0, $links.length));
          if (!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({ force: true });
          }
          randomEvent(eventsLeft - 1);
        });
        break;
      case 1:
        cy.get("input").then(($inputs) => {
          var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
          if (!Cypress.dom.isHidden(randomInput)) {
            cy.wrap(randomInput).type("monkey typing", { force: true });
          }
          randomEvent(eventsLeft - 1);
        });
        break;
      case 2:
        cy.get("select").then(($selects) => {
          var randomSelect = $selects.get(getRandomInt(0, $selects.length));
          if (!Cypress.dom.isHidden(randomSelect)) {
            cy.wrap(randomSelect).select(
              getRandomInt(0, randomSelect.options.length),
              { force: true }
            );
          }
          randomEvent(eventsLeft - 1);
        });
        break;
      case 3:
        cy.get("button").then(($buttons) => {
          var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
          if (!Cypress.dom.isHidden(randomButton)) {
            cy.wrap(randomButton).click({ force: true });
          }
          randomEvent(eventsLeft - 1);
        });
        break;
    }
  }
}
