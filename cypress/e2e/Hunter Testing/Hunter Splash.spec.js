describe('Splash Screen drop downs', () => {
    beforeEach('login the test user', () => {
        cy.visit('http://localhost:4200/splashPage')
        cy.get('app-navbar')
    })

    it('Overview What is Hunter', () =>{
        cy.get('button[cy-data="OverviewMenu"]').click()
        cy.get('[routerlink="/whatshunter"]').click()
        cy.contains('h1','What is "Hunter"')
            .parents('.workspace')
            .find('.explainText')
            .contains('p','Hunter Searches for answers')
            .should('contain','normal computer methods')
    })

    it('Overview Types of Hard Problems', () =>{
        cy.get('button[cy-data="OverviewMenu"]').click()
        cy.get('[routerlink="/hardproblem"]').click()
        cy.contains('h1','What\'s Hunter Consider a Challenge')
            .parents('.workspace')
            .find('.explainText')
            .contains('p','Hunter solves problems so vast ')
            .should('contain','reasonable time')
    })

    it('Overview Using Hunter', () =>{
        cy.get('button[cy-data="OverviewMenu"]').click()
        cy.get('[routerlink="/usinghunter"]').click()
        cy.contains('h1','Using Hunter')
            .parents('.workspace')
            .find('.explainText')
            .contains('p','Hunter works along side the scientist')
            .should('contain','researcher')
    })

    it('Overview Artificial Intelligence', () =>{
        cy.get('button[cy-data="OverviewMenu"]').click()
        cy.get('[routerlink="/aiga"]').click()
        cy.contains('h1','Artificial Intelligence')
            .parents('.workspace')
            .find('.explainText')
            .contains('p','computers mimic the way humans')
            .should('contain','do it fast')
    })

    it('Guides Research Applications', () =>{
        cy.get('button[cy-data="GuidesMenu"]').click()
        cy.get('[routerlink="/aboutResearch"]').click()
        cy.contains('h1','Researching With Hunter')
            .parents('.workspace')
            .find('.explainText')
            .contains('p','Solution Hunter Engineering itself')
            .should('contain','new features in Hunter')
    })



    // it('should Open Existing Project', () =>{
    //     cy.get('[data-cy="NavProjectDesign"]').click()
    //     cy.get('[data-cy="OpenExistProject"]').click()
    //     cy.get('.btn-warning').first().click()
    //     cy.get('[data-cy="NewProjExit"]').click()
    // })

    // it('should Launch a Project', () => {
    //     cy.get('[data-cy="executionDesktop"]').click()
    //     cy.get('[data-cy="execDesktop"]').click()
    //     cy.get('.btn-warning').first().click()
    // })
}
)


// describe(
//     'Logged In Functions', () => {
//     beforeEach('login the test user', () => {
//         cy.visit('http://localhost:4200/splashPage')
//         cy.get('app-navbar')
//         cy.get('#username').type("test")
//         cy.get('[data-cy="LoginButton"]').click()
//     })

//     it('should Start New Project', () =>{
//         cy.get('[data-cy="NavProjectDesign"]').click()
//         cy.get('[data-cy="StartNewProject"]').click()
//         cy.get('[data-cy="NewProjExit"]').click()
//     })

//     it('should Open Existing Project', () =>{
//         cy.get('[data-cy="NavProjectDesign"]').click()
//         cy.get('[data-cy="OpenExistProject"]').click()
//         cy.get('.btn-warning').first().click()
//         cy.get('[data-cy="NewProjExit"]').click()
//     })

//     it('should Launch a Project', () => {
//         cy.get('[data-cy="executionDesktop"]').click()
//         cy.get('[data-cy="execDesktop"]').click()
//         cy.get('.btn-warning').first().click()
//     })
// }
// )
