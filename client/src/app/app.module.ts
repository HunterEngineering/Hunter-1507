import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarModule } from './navBar/navBar.module';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { ExecutionDesktopModule } from './execution/execution-desktop.module';
import { AdministrationModule } from './administration/administration.module';
import { ProjectSetupToolsModule } from './projectSetup/project-setup-tools.module';
import { RequestProjectService } from './services/request-project.service';
import { ProjectRepository } from './repositories/ProjectRepository';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProjectSetupToolsModule,
    NavBarModule,
    MaterialModule,
    ExecutionDesktopModule,
    AdministrationModule,

    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [
    RequestProjectService,
    ProjectRepository,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: [
    MaterialModule,
    AdministrationModule
  ]
})
export class AppModule { }
