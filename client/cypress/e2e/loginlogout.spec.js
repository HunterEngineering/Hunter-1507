/// <reference types="cypress" />

describe('Navbar login/logout for test admin', () => {
    it ('should login to main screen/logout', () => {
        cy.visit('/')

        cy.get('mat-toolbar')
            .find('[data-cy="NavbarLogin"]').type('Admin')
            .parent()
            .find('[data-cy="NavbarPassword"]').type('Test$12345')
            .parent()
            .find('[data-cy="LoginButton"]').click()

        cy.get('[data-cy="WelcomeMessage"]').should('contain', 'Welcome Admin')

        cy.get('[data-cy="LogoutButton"]').click()

        cy.get('mat-toolbar').find('[data-cy="LoginButton"]').should('contain', 'Login')

    })
})