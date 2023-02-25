/// <reference types="cypress" />

declare namespace Cypress {
  import { Credential } from './support/commands';
  interface Chainable<Subject = any> {
    loginToBasicAuth(credential: Credential): Chainable<void>;
    clickAfterPrefetch(selector: string, waitTime = 500): Chainable<void>;
  }
}
