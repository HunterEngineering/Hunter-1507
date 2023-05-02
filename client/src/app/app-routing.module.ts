import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashPageComponent } from './SplashPage/SplashPage.component';
import { ProjectListComponent } from './projectSetup/project-list/project-list.component';
import { ExecutionDesktopComponent } from "./execution/execution-desktop/execution-desktop.component";
import { AdminDeleteUserComponent } from './administration/admin-manage-user/admin-manage-user.component';
import { AdminNewUserComponent } from './administration/admin-new-user/admin-new-user.component';
import { AdminUserProjectsComponent } from './administration/admin-user-projects/admin-user-projects.component';
import { ProjectCreateComponent } from './projectSetup/project-create/project-create.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { SplashPagePostComponent } from './SplashPagePost/SplashPagePost.component';
import { AuthGuardUsers } from './_guards/auth.guard.users';
import { AuthGuardDevelopers } from './_guards/auth.guard.developer';
import { AdminUpdateUserComponent } from './administration/admin-update-user/admin-update-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'splashPage', pathMatch: 'full' },
  { path: 'splashPage', component: SplashPageComponent, pathMatch: 'full' },
  { path: 'splashPagePost', component: SplashPagePostComponent, pathMatch: 'full' },

  {
    path: 'whatshunter',
    loadChildren: () => import('./PreReg/OverView/whatshunter/whatshunter.module')
      .then(m => m.WhatshunterModule)
  },
  {
    path: 'usinghunter',
    loadChildren: () => import('./PreReg/OverView/using-hunter/using-hunter.module')
      .then(m => m.UsingHunterModule)
  },
  {
    path: 'consulting',
    loadChildren: () => import('./PreReg/Contacts/consulting/consulting.module')
      .then(m => m.ConsultingModule)
  },
  {
    path: 'hardproblem',
    loadChildren: () => import('./PreReg/OverView/hardproblem/hardproblem.module')
      .then(m => m.HardProblemModule)
  },
  {
    path: 'aiga',
    loadChildren: () => import('./PreReg/OverView/aiga/aiga.module')
      .then(m => m.AigaModule)
  },
  {
    path: 'examples',
    loadChildren: () => import('./PreReg/Guides/examples/examples.module')
      .then(m => m.ExamplesModule)
  },
  {
    path: 'tutorials',
    loadChildren: () => import('./PreReg/Guides/tutorials/tutorials.module')
      .then(m => m.TutorialsModule)
  },
  {
    path: 'aboutResearch',
    loadChildren: () => import('./PreReg/Guides/research/research.module')
      .then(m => m.ResearchModule)
  },
  {
    path: 'aboutUs',
    loadChildren: () => import('./PreReg/Contacts/about-us/about-us.module')
      .then(m => m.AboutUsModule)
  },
  {
    path: 'contactUs',
    loadChildren: () => import('./PreReg/Contacts/contact-us/contact-us.module')
      .then(m => m.ContactUsModule)
  },
  { path: 'support', loadChildren: () => import('./PreReg/Contacts/support/support.module').then(m => m.SupportModule) },
  { path: 'consulting', loadChildren: () => import('./PreReg/Contacts/consulting/consulting.module').then(m => m.ConsultingModule) },

////////////////////////////////////////////////////////////

  { path: 'projectList', component: ProjectListComponent, pathMatch: 'full', canActivate: [AuthGuardDevelopers] },
  { path: 'createProject', component: ProjectCreateComponent, pathMatch: 'full', canActivate: [AuthGuardDevelopers] },
  { path: 'execDesktop', component: ExecutionDesktopComponent, pathMatch: 'full', canActivate: [AuthGuardUsers] },

  { path: 'errors', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },

/////////////////////////////////////////////////////////////

  { path: 'adminNewUser', component: AdminNewUserComponent, pathMatch: 'full' },
  { path: 'adminUserProjects', component: AdminUserProjectsComponent, pathMatch: 'full' },
  { path: 'adminManageUser', component: AdminDeleteUserComponent, pathMatch: 'full' },
  { path: 'adminUpdateUser', component: AdminUpdateUserComponent, pathMatch: 'full' },

////////////////////////////////////////////////////////////

  { path: '**', component: NotFoundComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
