/// <reference types="cypress" />

describe('Service Form Interaction', () => {
    it('Fills the title field and submits the form', () => {
        cy.visit('/account/professionals/services/create-a-service'); // Replace with the actual path to your ServiceForm component

        // Enters a title in the input field
        cy.get('input[name="title"]').type('Sample Title');

    });
});