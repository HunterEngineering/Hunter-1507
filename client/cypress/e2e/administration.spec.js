/// <reference types="cypress" />

describe('Administration Functions', () => {
    it('should create a new user', () => {
        cy.visit('/')
        cy.get('mat-toolbar')
        .find('[data-cy="NavbarLogin"]').type('Admin')
        .parent()
        .find('[data-cy="NavbarPassword"]').type('Test$12345')
        .parent()
        .find('[data-cy="LoginButton"]').click()

        cy.get('[data-cy="adminFunctions"]')
        .click()
        cy.get('button[routerlink="/adminNewUser"]')
        .click()

        cy.get('[data-cy="userName"]').type('cy-TestUser')
        cy.get('[data-cy="knownAs"]').type('cy-KnownAs')

        cy.get('[data-cy="password"]').type('cy-Password')
        cy.get('[data-cy="confirmPassword"]').type('cy-Password')

        cy.get('[data-cy="firstName"]').type('cy-Fred')
        cy.get('[data-cy="lastName"]').type('cy-Flintstone')

        cy.get('[data-cy="phone"]').type('1-999-555-1212')

        cy.get('[data-cy="city"]').type('cy-CaveCity')
        cy.get('[data-cy="state"]').type('cy-CaveState')
        cy.get('[data-cy="country"]').type('cy-Country')

        cy.get('[data-cy="email"]').type('freddy@cave.com')

        cy.get('[data-cy="cantrial"]').check()
        // cy.get('[data-cy="trialbegan"]').type('1/1/1800')
        // cy.get('[data-cy="trialend"]').type('1/10/1801')

        cy.get('[data-cy="cctypeuser"]').check()
        cy.get('[data-cy="nameOnCC"]').type('Fred Q Flintstonr')
        cy.get('[data-cy="ccNumber"]').type('12345')
        cy.get('[data-cy="ccExpires"]').type('01/01/1800')
        cy.get('[data-cy="ccAuthCode"]').type('123')

        cy.get('[data-cy="question"]').type('Who is your best friend')
        cy.get('[data-cy="answer"]').type('Jesus')

        cy.get('[data-cy="roles"]').type('Admin, Developer, User')

        cy.get('[data-cy="registerBtn"]').click()
    })
})