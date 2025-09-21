Feature: Agendamentos

  Background:
    Given the API is running
    And I have a valid JWT token for email "email1@example.com"

  Scenario: Listar agendamentos (autenticado)
    When I request GET "/appointments"
    Then the response status should be 200
    And the response should be a JSON array

  Scenario: Criar agendamento (autenticado)
    When I request POST "/appointments" with body:
      | userId | {{userId}} |
      | date | 2025-09-30T10:00:00.000Z |
      | time | 15:00 |
    Then the response status should be 201
    And the response should contain field "userId"

  Scenario: Buscar agendamento por ID (autenticado)
    Given an appointment exists and I save the id as "appointmentId"
    When I request GET "/appointments/{{appointmentId}}"
    Then the response status should be 200

  Scenario: Atualizar agendamento (autenticado)
    Given an appointment exists and I save the id as "appointmentId"
    When I request PATCH "/appointments/{{appointmentId}}" with body:
      | notes | Atualizado via teste |
    Then the response status should be 200

  Scenario: Deletar agendamento (autenticado)
    Given an appointment exists and I save the id as "appointmentId"
    When I request DELETE "/appointments/{{appointmentId}}"
    Then the response status should be 200
