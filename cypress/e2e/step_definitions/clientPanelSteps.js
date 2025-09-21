/* global cy */
const { Given } = require('@badeball/cypress-cucumber-preprocessor');

Given('a client panel exists', () => {
  cy.task('log', 'step placeholder do clientPanel');
});

module.exports = {};
