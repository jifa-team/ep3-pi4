Feature: Client Panel

  Background:
    Given the API is running
    And I have a valid JWT token for email "email1@example.com"

  Scenario: Acessar atividades (autenticado)
    When I request GET "/client-panel/atividades/{{userId}}"
    Then the response status should be 200

  Scenario: Bloqueio sem token
    When I request GET "/client-panel/atividades/{{userId}}" without token
    Then the response status should be 401

  Scenario: Criar/agendar via painel (autenticado)
    When I request POST "/client-panel/agendamentos" with body:
      | userId | {{userId}} |
      | date   | 2025-09-15T14:00:00.000Z |
      | time   | 11:00 |
    Then the response status should be 201

  Scenario: Atualizar agendamento via painel (autenticado)
    Given an appointment exists and I save the id as "appointmentId"
    When I request PUT "/client-panel/agendamentos/{{appointmentId}}" with body:
      | notes | Reagendado via painel |
    Then the response status should be 200

  Scenario: Deletar agendamento via painel (autenticado)
    Given an appointment exists and I save the id as "appointmentId"
    When I request DELETE "/client-panel/agendamentos/{{appointmentId}}"
    Then the response status should be 200
