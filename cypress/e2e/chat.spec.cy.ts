/// <reference types="cypress" />
describe('Chat', () => {
  beforeEach(() => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.loginToBasicAuth({ username, password });
    cy.get('[data-testid="signin-start"]').trigger('mouseover');
    cy.wait(500);
    cy.get('[data-testid="signin-start"]').click();
    cy.wait(500);
    cy.get('[data-testid="login-form"]').should('be.visible', true);

    const signInEmail = Cypress.env('signInEmail');
    const signInPassword = Cypress.env('signInPassword');
    cy.get('input[placeholder="Email"]').type(signInEmail);
    cy.get('input[placeholder="Password"]').type(signInPassword);
    cy.get('[type="submit"]').click();
    cy.wait(10000);
    cy.get('[data-testid="signout-btn"]').should('be.visible', true);
  });
  it('Shall navigate to private chatroom after successful signed in', () => {
    cy.get('[data-testid="private-card"]').should('be.visible', true);
    cy.clickAfterPrefetch('[data-testid="private-card"]', 20000);
    cy.get('[data-testid="private-message-input"]').should('be.visible', true);
    cy.get('[data-testid="signout-btn"]').click();
    cy.get('[data-testid="login-form"]').should('be.visible', true);
  });
  it('Shall navigate to /group/join and join the group after successful signed in', () => {
    cy.get('[data-testid="group-card"]').should('be.visible', true);
    cy.clickAfterPrefetch('[data-testid="group-card"]', 5000);
    cy.get('[data-testid="join-card"]').should('be.visible', true);
    cy.get('[data-testid="create-card"]').should('be.visible', true);
    cy.clickAfterPrefetch('[data-testid="join-card"]', 12000);
    cy.get('[data-testid="group-list"]').should('be.visible', true);
    cy.clickAfterPrefetch('[data-testid="group-0"]', 15000);
    cy.get('[data-testid="group-message-input"]').should('be.visible', true);
    cy.get('[data-testid="signout-btn"]').click();
    cy.get('[data-testid="login-form"]').should('be.visible', true);
  });
  // it('Shall navigate to /profile after successful signed up', () => {
  //   const signUpEmail = Cypress.env("signUpEmail")
  //   const signUpPassword = Cypress.env("signUpPassword")
  //   cy.get('[data-testid="regist-login"]').trigger('mouseover');
  //   cy.wait(500);
  //   cy.get('[data-testid="regist-login"]').click();
  //   cy.wait(1000);
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
