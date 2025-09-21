/* global cy, Cypress, expect */
const { Given } = require('@badeball/cypress-cucumber-preprocessor');

Given('an appointment exists and I save the id as {string}', (alias) => {
  // cria um agendamento e armazena o id
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  cy.request({
    method: 'POST',
    url: `${base}/appointments`,
    headers: { Authorization: Cypress.env('JWT_TOKEN') },
    body: { userId: Cypress.env('TEST_USER_ID') || '000000000000000000000000', date: new Date().toISOString(), time: '10:00' }
  }).then((resp) => {
    expect(resp.status).to.be.oneOf([201, 200]);
    // API retorna { message, appointment }
    const created = resp.body && (resp.body.appointment || resp.body);
    const id = created && (created._id || created.id);
    if (id) {
      cy.wrap(id).as(alias);
      Cypress.env('TEST_APPOINTMENT_ID', id);
    }
  });
});

module.exports = {};
