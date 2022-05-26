describe('should generate a shorten url', () => {
  it('should ', () => {
    const url = 'http://google.fr';

    cy.visit('http://localhost:3000');
    cy.dataCy('urlInput').type(url);
    cy.dataCy('urlSubmit').click();
    cy.dataCy('urlOrigin').contains(url);
    cy.dataCy('urlShortened').contains(/http:\/\/localhost:4000\/u\/([a-z]{10})/);
  });
});
