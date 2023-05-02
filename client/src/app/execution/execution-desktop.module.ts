import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExecDesktopPopupComponent} from "./exec-desktop-popup/exec-desktop-popup.component";
import {ExecutionDesktopComponent} from "./execution-desktop/execution-desktop.component";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    ExecDesktopPopupComponent,
    ExecutionDesktopComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    BrowserModule
  ]
})
export class ExecutionDesktopModule { }
