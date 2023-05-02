import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectDto} from "../../dtos/ProjectDto";
import {environment} from "../../../environments/environment";
import { connectorParm } from 'src/app/entities/connectorParm';
import { Toast, ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ExecDesktopPopupComponent} from "../exec-desktop-popup/exec-desktop-popup.component";

@Component({
  selector: 'app-execution-desktop',
  templateUrl: './execution-desktop.component.html',
  styleUrls: ['./execution-desktop.component.css']
})
export class ExecutionDesktopComponent implements OnInit {
  userProjects: ProjectDto[] = [];
  steps: number = 1;
  selectedProjectId: number = 0;
  selectedProject: ProjectDto = new ProjectDto();
  selectedConnectorId: string = '';
  connectorParms: connectorParm[] = [];
  name: string = '';
  parmType: string = '';
  order: number = 0;
  nestingLevel: number = 0;
  value: string = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // get list of selectable projects - order by Id and not a template type
    var baseUrl = environment.apiUrl;
    this.http.get(baseUrl + 'Projects/GetUserProjects/').subscribe({
      next: (response: any) => {
        this.userProjects = response;
      },
      error: (err) => {
        console.log(err.Message);
      }
    })
  }

  chooseProject(id: number) {
    this.selectedProjectId = id;
    for (let i = 0; i < this.userProjects.length; i++) {
      if (this.userProjects[i].id == this.selectedProjectId) {
        this.selectedProject = this.userProjects[i];
        break;
      }
    }
    this.steps++;
  }

  AddParameter() {
    this.doConnectorDialog();
  }

  doConnectorDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedProjectId;

    const dialogRef = this.dialog.open(ExecDesktopPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.selectedConnectorId = result.data;
      }
    })
  }

  SetToStep(stepNumber: number) {
    this.steps = stepNumber;
    if (stepNumber == 1)
      this.selectedProjectId = 0;
  }

  SetToStepAndLaunch(stepNumber: number) {
    this.SetToStep(stepNumber);
    this.LaunchProject()
  }

  LaunchProject() {
    var baseUrl = environment.apiUrl;
    this.http.post(baseUrl + 'Projects/LaunchProject', this.selectedProject).subscribe({
      next: (response) => { },
      error: (err) => {}
    })
  }

}
