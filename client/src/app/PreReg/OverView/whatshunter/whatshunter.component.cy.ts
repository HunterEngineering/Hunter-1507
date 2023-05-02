import { WhatsHunterComponent } from './whatshunter.component'

describe('Whats Hunter Component', () => {
    it('mounts', () => {
        cy.mount(WhatsHunterComponent)
 //       cy.get('h1').should('have.text', 'What is "Hunter"')
    })
})