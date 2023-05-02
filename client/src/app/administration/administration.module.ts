import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDeleteUserComponent } from './admin-manage-user/admin-manage-user.component';
import { AdminNewUserComponent } from './admin-new-user/admin-new-user.component';
import { AdminUserProjectsComponent } from './admin-user-projects/admin-user-projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';

@NgModule({
  declarations: 
  [
    AdminDeleteUserComponent,
    AdminNewUserComponent,
    AdminUserProjectsComponent,
    AdminUpdateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminNewUserComponent
  ]
})
export class AdministrationModule { }
