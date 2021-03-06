import {urls, user, month, year, contains, click, wait, shouldNotBeVisble, shouldBeVisible} from './../../index';
import {signin, signout} from './../../helper';
import {urlVisited, visitIndexRoute} from './../../visitRoutes';

describe('Test dashboard', () => {
  it('after clicking button should load login page', () => {
    visitIndexRoute();
    urlVisited(urls.baseUrl);
    cy.server();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl + urls.login);
  });
});
