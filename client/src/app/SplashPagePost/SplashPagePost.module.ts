import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashPagePostComponent } from './SplashPagePost.component';
import { ProjectSetupToolsModule } from 'src/app/_projectSetup/project-setup-tools.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectSetupToolsModule
  ],
  declarations: [SplashPagePostComponent]
})
export class SplashPagePostModule { }
