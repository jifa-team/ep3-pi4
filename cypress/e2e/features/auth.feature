Feature: Autenticação

  Background:
    Given the API is running

  Scenario: Login com credenciais válidas
    Given a user exists with email "email1@example.com" and password "senha"
    When I login with email "email1@example.com" and password "senha"
    Then the response status should be 200
    And the response should contain a JWT token

  Scenario: Login com credenciais inválidas
    Given no user exists with email "noone@example.com"
    When I login with email "noone@example.com" and password "wrong"
    Then the response status should be 401