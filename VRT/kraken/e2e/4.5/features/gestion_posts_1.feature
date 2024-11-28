Feature: Gestión de Posts - Parte 1
  
  @user1 @web
  Scenario: P004 - Creación de nuevo post
    Given I navigate to page "<URL_SIGN_IN>"
    And I wait for 2 seconds
    And I enter email "<USERNAME>"
    And I enter password "<PASSWORD>"
    And I click next
    And I wait for 2 seconds
    And I navigate to page "<URL_DASHBOARD>"
    And I wait for 2 seconds
    And I navigate to page "<URL_POSTS>"
    And I wait for 2 seconds
    When I click on the link with text "New post"
    And I wait for 2 seconds
    And I enter post name "Nuevo post"
    And I enter post description "Esto es una prueba de un post al crearlo"
    And I wait for 2 seconds
    And I click on the link with text "Publish"
    And I wait for 2 seconds
    And I click on the link with text "Publish post, right now - crear"
    And I navigate to page "<URL_POSTS_PUBLISH>"
    And I wait for 3 seconds
    Then the post "Nuevo post" should be present in the post list
    And I wait for 2 seconds 

  @user2 @web
  Scenario: P010 - Programación de publicación
    Given I navigate to page "<URL_SIGN_IN>"
    And I wait for 2 seconds
    And I enter email "<USERNAME>"
    And I enter password "<PASSWORD>"
    And I click next
    And I wait for 2 seconds
    And I navigate to page "<URL_DASHBOARD>"
    And I wait for 2 seconds
    And I navigate to page "<URL_POSTS>"
    And I wait for 2 seconds
    When I click on the link with text "New post"
    And I wait for 2 seconds
    And I enter post name "Nuevo post programado"
    And I enter post description "Esto es una prueba de un post programado"
    And I click on the link with text "Publish"
    And I wait for 2 seconds
    And I click on the link with text "opciones de cuando publicar"
    And I click on the link with text "programar para publicar luego"
    And I navigate to page "<URL_POST_SCHEDULED>"
    And I wait for 5 seconds
    Then the post "Nuevo post programado" should be present in the post schedule list
    And I wait for 2 seconds  

  @user3 @web   
  Scenario: P009 - Previsualización de un post
    Given I navigate to page "<URL_SIGN_IN>"
    And I wait for 2 seconds
    And I enter email "<USERNAME>"
    And I enter password "<PASSWORD>"
    And I click next
    And I wait for 2 seconds
    And I navigate to page "<URL_DASHBOARD>"
    And I wait for 2 seconds
    And I navigate to page "<URL_POSTS>"
    And I wait for 2 seconds
    When I click on the link with text "New post"
    And I wait for 2 seconds
    And I enter post name "Esto es un post para probar el preview del mismo"
    And I enter post description "Esto es una prueba de un post"
    And I click on the link with text "Ver preview post"
    And I wait for 3 seconds
    Then I should see the preview title "Esto es un post para probar el preview del mismo"
    And I wait for 2 seconds