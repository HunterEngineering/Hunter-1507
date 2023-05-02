import {Component, Inject, Input, OnInit} from '@angular/core';
import {ProjectDto} from "../../dtos/ProjectDto";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {CacheService} from "../../services/cache.service";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environments/environment";
import { connectorParm } from 'src/app/entities/connectorParm';


@Component({
  selector: 'app-exec-desktop-popup',
  templateUrl: './exec-desktop-popup.component.html',
  styleUrls: ['./exec-desktop-popup.component.css']
})
export class ExecDesktopPopupComponent implements OnInit {
  @Input() projectType? : string;

  projectId: number = -1;
  parameterId: number = 0;
  parameterName: string = '';
  parameterType: string = '';
  parameterOrder: number = 0;
  parameterNestingLevel: number = 0;
  parameterValue: string = '';
  individualConnector: string = '';

  constructor(public dialogRef: MatDialogRef<ExecDesktopPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
              private cache: CacheService,
              private toastr: ToastrService
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.projectId = this.data;
  }

  Close()
  {
    this.dialogRef.close({ event: 'close', data: this.projectId});
  }

  Save()
  {
    var newParm = new connectorParm();
    newParm.connectorType = this.individualConnector;

    if (this.parameterName.length > 0) {
      newParm.name = this.parameterName;
    } else {
      this.toastr.error('Parameter Name is required; please add');
    }

    if (this.parameterType.length > 0) {
      newParm.parmType = this.parameterType;
    } else {
      this.toastr.error('Parameter Type is required; please add');
      return;
    }

    if (this.parameterValue.length > 0) {
      newParm.value = this.parameterValue;
    } else {
      this.toastr.error('Parameter Value is required; please add');
      return;
    }

    if (this.parameterOrder >= 0) {
      newParm.order = this.parameterOrder;
    } else {
      this.toastr.error('Parameter Order number is required; please add');
      return;
    }

    if (this.parameterNestingLevel >= 0) {
      newParm.nestingLevel = this.parameterNestingLevel;
    } else {
      this.toastr.error('Parameter Nesting Level number is required; please add');
      return;
    }

    if (this.projectId >= 0) {
      newParm.projectId = this.projectId;
    } else {
      this.toastr.error('Must specify a project; please add');
      return;
    }

    // save the parameter to database for this connector... (selectedConnectorId)
    // post to write out new one, put to update existing one
    var baseUrl = environment.apiUrl;
    this.http.post(baseUrl + 'Projects/CreateConnectorParm', newParm).subscribe({
      next: (response) => {

      },
      error: (err) => {

      }
    })

    // if (this.isProjectRecordInDB == true) {
    //   this.http.post<ProjectDto>(baseUrl + 'Projects/UpdateProject', this.projectDto).subscribe({
    //     next: (response: ProjectDto) => {
    //       this.projectId = response.id;
    //       this.cache.StorageSetProject(response);
    //       this.isProjectRecordInDB = true;
    //     },
    //     error: (err) => { console.log(err); },
    //     complete: () => { console.log("done"); }
    //   });
    // }
    // else {
    //   this.http.post<ProjectDto>(baseUrl + 'Projects/CreateProject', this.projectDto).subscribe({
    //     next: (response: ProjectDto) => {
    //       this.projectId = response.id;
    //       this.cache.StorageSetProject(response);
    //       this.isProjectRecordInDB = true;
    //     },
    //     error: (err) => { console.log(err); },
    //     complete: () => { console.log("done"); }
    //   });
    // }
  }

  editDeleteParameter() {

  }

  getParameterType(selected: string) {
   this.parameterType = selected;
  }


  HelpParameterId()
  {
    alert("The parameter ID is assigned by the server when it is first created.  " +
      "However, it is needed if you choose to edit/modify or delete a parameter.\n" +
      "Selecting an existing parameter is sufficient for the system to find it.");
  }

  HelpName()
  {
    alert("The NAME of a parameter must match the NAME that the backend controller will use " +
      "to 'Hunt' for a best solution.\n  If you are the developer who created the backend Hunter " +
      "then you must make sure these parameter requirements are well documented and \navailable in " +
      "the front-end so 'front-end users' can reference them in the future."
    );
  }

  HelpParmType()
  {
    alert("Parameter types are shown in the drop-down control.\n  They are int (integer), " +
      "long (long integer), decimal, double (long decimal), boolean (true/false),\n string, and " +
      "objects.\n  Objects are groups of parameters belonging to a Named parameter.\n" +
      "This can be thought of as a Named parameter containing multiple Named parameters - \n "+
      "each of which may be themselves objects containing groups of parameters.\n This is " +
      "described in 'IsNested' and 'Order'");
  }

  HelpParmOrder()
  {
    alert("Order is a number (integer) which indicates which parameter strings " +
    "occur before which other ones. NOTE: the numbers can be any integer.  For " +
    "example they could be 1, 50, 75, 122, ... and they will appear in that order.  " +
    "Order becomes important when a parameter is of type 'Object' with Order '10'.  " +
    "Parameters that have numbers above 10 and marked as Nested BELONG to the Object 10." +
    "See also nesting level");
  }

  HelpParmNesting()
  {
    alert("UPDATING THIS FIELD")
  }

  HelpParmValue()
  {
    alert("UPDATING THIS FIELD");
  }

}
