import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { MatSliderModule } from '@angular/material/slider';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectCreateComponent,
    ],
  imports: [
    CommonModule,
    MatDialogModule,
    MaterialModule,
    MatSliderModule
  ],
  entryComponents: [ProjectCreateComponent]
})
export class ProjectSetupToolsModule { }
