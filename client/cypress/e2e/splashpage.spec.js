/// <reference types="cypress" />

describe('Pre-login navbar dropdowns', () =>{
    it('Overview - What is Hunter', () => {
        cy.visit('/')

        cy.get('[cy-data="OverviewMenu"]')
            .click()
        cy.get('button[routerlink="/whatshunter"]')
            .click()
        cy.get('h1').should('contain', 'What is "Hunter"')
    })

    it('Overview - Some Types of Hard Problems', () => {
        cy.visit('/')

        cy.get('[cy-data="OverviewMenu"]')
            .click()
        cy.get('button[routerlink="/hardproblem"]')
            .click()
        cy.get('h1').should('contain', "What's Hunter Consider a Challenge")
    })

    it('Overview - Using Hunter', () => {
        cy.visit('/')

        cy.get('[cy-data="OverviewMenu"]')
            .click()
        cy.get('button[routerlink="/usinghunter"]')
            .click()
        cy.get('h1').should('contain', "Using Hunter")
    })

    it('Overview - Artificial Intelligence', () => {
        cy.visit('/')

        cy.get('[cy-data="OverviewMenu"]')
            .click()
        cy.get('button[routerlink="/aiga"]')
            .click()
        cy.get('h1').should('contain', "Artificial Intelligence")
    })

    it('Guides - Research Applications', () => {
        cy.visit('/')

        cy.get('[cy-data="GuidesMenu"]')
            .click()
        cy.get('button[routerlink="/aboutResearch"]')
            .click()
        cy.get('h1').should('contain', "Researching With Hunter")
    })

    it('Contacts - About Us', () => {
        cy.visit('/')

        cy.get('[cy-data="ContactsMenu"]')
            .click()
        cy.get('button[routerlink="/aboutUs"]')
            .click()
        cy.get('[data-cy="artIntel"]').should('contain', "Artificial Intelligence")
    })

    it('Contacts - Support', () => {
        cy.visit('/')

        cy.get('[cy-data="ContactsMenu"]')
            .click()
        cy.get('button[routerlink="/support"]')
            .click()
        cy.get('h1').should('contain', "Technical Support")
    })

    it('Contacts - Consulting Services', () => {
        cy.visit('/')

        cy.get('[cy-data="ContactsMenu"]')
            .click()
        cy.get('button[routerlink="/consulting"]')
            .click()
        cy.get('h1').should('contain', "Consulting Services")
    })

})

