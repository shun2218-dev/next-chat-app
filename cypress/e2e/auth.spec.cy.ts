/// <reference types="cypress" />
describe('Authentication', () => {
  beforeEach(() => {
    // Set up the environment variables for Basic Authentication
    // 1. Make cypress.dev.config.ts file
    // 2. Add env.username and env.password
    // ```
    // /// <reference types="cypress" />
    // import { defineConfig } from 'cypress';
    // export default defineConfig({
    //   env: {
    //     username: YOUR USERNAME FOR BASIC AUTHENTICATION,
    //     password: YOUR PASSWORD FOR BASIC AUTHENTICATION,
    //     signInEmail: ,
    //     signInPassword: ,
    //     signUpEmail: ,
    //     signUpPassword: ,
    //   },
    //   e2e: {
    //     setupNodeEvents(on, config) {
    //       // implement node event listeners here
    //     },
    //   },
    // });
    // ```
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.loginToBasicAuth({ username, password });
    cy.clickAfterPrefetch('[data-testid="signin-start"]');
    cy.get('[data-testid="login-form"]').should('be.visible', true);
  });
  it('Shall navigate to /home after successful signed in', () => {
    const signInEmail = Cypress.env('signInEmail');
    const signInPassword = Cypress.env('signInPassword');
    cy.get('input[placeholder="Email"]').type(signInEmail);
    cy.get('input[placeholder="Password"]').type(signInPassword);
    cy.get('[type="submit"]').click();
    cy.wait(10000);
    cy.get('[data-testid="signout-btn"]').should('be.visible', true);
    cy.get('[data-testid="signout-btn"]').click();
    cy.get('[data-testid="login-form"]').should('be.visible', true);
  });
  // it('Shall navigate to /profile after successful signed up', () => {
  //   const signUpEmail = Cypress.env("signUpEmail")
  //   const signUpPassword = Cypress.env("signUpPassword")
  //   cy.clickAfterPrefetch('[data-testid="regist-login"]', 1000)
  //   cy.get('[data-testid="regist-form"]').should('be.visible', true);
  //   cy.get('input[placeholder="Email"]').type(signUpEmail);
  //   cy.get('input[placeholder="Password"]').type(signUpPassword);
  //   cy.get('input[placeholder="Password Confirmation"]').type(signUpPassword);
  //   cy.get('[type="submit"]').click();
  //   cy.wait(20000);
  //   cy.get('[data-testid="signout-btn"]').should('be.visible', true);
  //   cy.get('[data-testid="profile-form"]').should('be.visible', true);
  //   cy.get('input[type="file"]').selectFile('cypress/fixtures/next.png');
  //   cy.wait(500);
  //   cy.get('input[placeholder="Your Name"]').type('Cypress');
  //   cy.get('[data-testid="upload-profile]').click();
  //   cy.wait(5000);
  //   cy.get('[data-testid="signout-btn"]').click();
  //   cy.get('[data-testid="login-form"]').should('be.visible', true);
  // });
});
export {};
