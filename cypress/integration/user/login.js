import {urls, user, apiUrls} from '../../index';
import {signin, signout} from '../../helper';
import {urlVisited, visitIndexRoute} from '../../visitRoutes';

describe('User login', () => {
  it('user should able to login and redirected to home page', () => {
    signin(user.user);
    urlVisited(urls.baseUrl + urls.monthlyAttendance);
  });
  it('trim email, so there is no space at the end', () => {
    signin(user.userWhiteSpace);
    urlVisited(urls.baseUrl + urls.monthlyAttendance);
  });
  it('user should get promoted for worng password', () => {
    signin(user.userWrongPassword);
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.confirm').click();
  });
  it('user should get promoted for worng username with error msg', () => {
    signin(user.userWrongPassword);
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.confirm').click();
  });
  it('On click to guest login user should redirect to policy_documents route', () => {
    cy.get('#guestLogin').click();
    urlVisited(urls.baseUrl + urls.policyDocuments);
  });
  it('On click to guest login user should redirect to policy_documents route', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    cy.get('#guestLogin').click();
    urlVisited(urls.baseUrl + urls.policyDocuments);
  });
  it('should not go to other page when left blank username/password', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    cy.get('#usernameInput').type('atul');
    cy.get('#loginButton').click();
    urlVisited(urls.baseUrl + urls.login);
  });
});
