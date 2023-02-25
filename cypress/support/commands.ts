/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
export type Credential = {
  username: string;
  password: string;
};

function logInBasicAuthentication({ username, password }: Credential) {
  cy.visit('/', {
    auth: {
      username,
      password,
    },
  });
}

function clickAfterPrefetch(selector: string, waitTime: number) {
  cy.get(selector).trigger('mouseover');
  cy.wait(500);
  cy.get(selector).click();
  cy.wait(waitTime);
}

Cypress.Commands.add('loginToBasicAuth', (credential: Credential) => {
  logInBasicAuthentication({ ...credential });
});

Cypress.Commands.add(
  'clickAfterPrefetch',
  (selector: string, waitTime = 500) => {
    clickAfterPrefetch(selector, waitTime);
  }
);
export {};
