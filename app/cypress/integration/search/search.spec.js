describe('Search bar', () => {
  it('can be used to search for flights', () => {
    // Visit the home page
    cy.visit('/');

    // Type a search term into the search bar
    cy.get('#search-bar').type('New York');

    // Press Enter to submit the search
    cy.get('#search-bar').type('{enter}');

    // Check that the search results page is displayed
    cy.url().should('include', '/search?q=New+York');

    // Check that the search term is displayed on the results page
    cy.contains('Search results for "New York"');
  });
});
