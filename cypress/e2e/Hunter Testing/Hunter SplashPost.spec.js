describe(
    'Logged In Functions', () => {
    beforeEach('login the test user', () => {
        cy.visit('http://localhost:4200/splashPage')
        cy.get('app-navbar')
        cy.get('#username')
            .type("admin")
            .next()
            .type('Test$12345')
            .next()
            .click()
    })

    it('should Start New Project', () =>{
        cy.get('[data-cy="NavProjectDesign"]').click()
        cy.get('[data-cy="StartNewProject"]').click()
        cy.get('[data-cy="NewProjExit"]').click()
    })

    it('should Open Existing Project', () =>{
        cy.get('[data-cy="NavProjectDesign"]').click()
        cy.get('[data-cy="OpenExistProject"]').click()
        cy.get('.btn-warning').first().click()
        cy.get('[data-cy="NewProjExit"]').click()
    })

    it('should Launch a Project', () => {
        cy.get('[data-cy="executionDesktop"]').click()
        cy.get('[data-cy="execDesktop"]').click()
        cy.get('.btn-warning').first().click()
    })
}
)
