describe('Login Admin Default', () => {
    beforeEach('login default admin user', () => {
        cy.visit('http://localhost:4200/splashPage')
        cy.get('app-navbar')
    })

    it('should login to initial test account for admin', () => {
        cy.get('#username')
            .type("Admin")
            .next()
            .type("Test$12345")
            .next()
            .click()


        cy.get('app-navbar')
        .should('contain',"Welcome Admin ")

        cy.contains('button'," Logout ").click()
        
        cy.get('app-navbar')
            .should('not.contain',"Welcome Admin ")

    })
})
