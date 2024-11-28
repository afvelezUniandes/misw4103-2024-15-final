  
  Feature: Gestión de Pages
  
  @user1 @web
  Scenario: P014 - Creación de páginas
    Given I navigate to page "<URL_DASHBOARD>"
    And I wait for 2 seconds
    And I enter email "<USERNAME>"
    And I enter password "<PASSWORD>"
    And I click next
    And I wait for 2 seconds
    And I navigate to page "<URL_PAGES>"
    And I wait for 2 seconds
    When I click on the link with text "Nueva pagina"
    And I wait for 2 seconds
    And I enter page name "Creación de nueva página"
    And I enter page description "Esto es una prueba de una página nueva"
    And I click on the link with text "Publish pagina"
    And I wait for 2 seconds
    And I click on the link with text "Continue, final review pagina"
    And I click on the link with text "Publish page, right now pagina"
    And I navigate to page "<URL_PAGES>"
    And I wait for 2 seconds
    Then the page "Creación de nueva página" should be present in the page list
    And I wait for 2 seconds 