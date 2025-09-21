/* global cy, Cypress */
const { Given } = require('@badeball/cypress-cucumber-preprocessor');

Given('I have a valid JWT token for email {string}', (email) => {
  cy.task('log', `Obtendo token para ${email}`);
  return cy.getToken(email, 'senha').then((token) => {
    cy.wrap(token).as('jwtToken');
    // também define a var de ambiente para requisições
    Cypress.env('JWT_TOKEN', token);

    // tenta encontrar o id do usuário por email e salva como alias/env var
    const base = Cypress.env('API_BASE') || 'http://localhost:3000';
    return cy.request({
      method: 'GET',
      url: `${base}/users`,
      headers: { Authorization: Cypress.env('JWT_TOKEN') },
      failOnStatusCode: false
    }).then((resp) => {
      if (resp.status === 200 && Array.isArray(resp.body)) {
        const u = resp.body.find(x => String(x.email).toLowerCase() === String(email).toLowerCase());
        if (u) {
          const id = u._id || u.id;
          if (id) {
            cy.wrap(id).as('userId');
            Cypress.env('TEST_USER_ID', id);
            return;
          }
        }
      }

      // se não encontrado, tenta criar usuário e salvar o id
      const cpf = `${Date.now()}`;
      return cy.request({
        method: 'POST',
        url: `${base}/users`,
        body: { firstName: 'Auto', lastName: 'User', email, password: 'senha', cpf },
        failOnStatusCode: false
      }).then((r2) => {
        if (r2 && r2.body) {
          const created = r2.body.user || r2.body;
          const id2 = created && (created._id || created.id);
          if (id2) {
            cy.wrap(id2).as('userId');
            Cypress.env('TEST_USER_ID', id2);
          }
        }
      });
    });
  });
});

module.exports = {};
