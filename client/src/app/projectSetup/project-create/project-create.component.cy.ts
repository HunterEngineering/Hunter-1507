import { HttpClient } from '@angular/common/http';
import { ProjectCreateComponent } from './project-create.component';


describe('project-create component', () => {
    it('mounts', () => {
        cy.mount(ProjectCreateComponent)
    })
})