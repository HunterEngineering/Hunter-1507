import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appuserDto } from 'src/app/dtos/appuserDto';
import { memberDto } from 'src/app/dtos/memberDto';
import { AccountService } from 'src/app/services/account.service';
import { RequestUserService } from 'src/app/services/request-user-service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrls: ['./admin-update-user.component.css']
})
export class AdminUpdateUserComponent implements OnInit {
  private editAlertService: any;
  @Output() cancelRegister = new EventEmitter();
  updateForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  userToUpdate: appuserDto = new appuserDto();
  idToBeUpdated: number = 0;
  baseUrl: string = '';

  // form fields -- see ngModel
    // form fields -- see ngModel
    formFields: appuserDto = new appuserDto(); // for ngModel in html
    confirmPassword: string = '';
    trialbegan: string = '';
    trialend: string = '';


  constructor(private accountService: AccountService, private toastr: ToastrService, 
    private fb: FormBuilder, private router: Router, private reqsvc: RequestUserService,
    private http: HttpClient
    ) {}


  ngOnInit(): void {
    this.baseUrl = environment.apiUrl;
    this.initializeForm();

    this.accountService.NextToBeUpdated.subscribe((nxtId) => {
      if (nxtId > 0) {        
        this.getSelectedUser(nxtId);
    }
    });

    // this.reqsvc.UserToDOMisReady.subscribe( (selectedUser) => {
    //   this.formFields = selectedUser;
    // })
  }

  getSelectedUser(nxtId: number) {
    this.accountService.NextToBeUpdated.next(0);
    var url = this.baseUrl + `Users/GetUserById/${nxtId}`;
    this.http.get<appuserDto>( url )
      .subscribe({
      next: (response: appuserDto) =>
      {
        var x = response;
        // this.userToUpdate = response;
        this.formFields = response;
      },
      error: (err) =>
      {
        console.log(err.error.message);
      }
    });
  }

  initializeForm() {
    this.updateForm = this.fb.group({
      userName: ['', Validators.required],
      // password: ['', 
      //   [Validators.required, Validators.minLength(8), Validators.maxLength(40) ]],
      // confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      knownAs: ['', Validators.required],
  
      phone: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      country: ['', Validators.required],

      email: [''],

      cantrial: [false],
      trialbegan: [],
      trialend: [],
  
      cctypeuser: [false],
      nameOnCC: [''],
      ccNumber: [''],
      ccExpires: [''],
      ccAuthCode: [''],
  
      question: ['', Validators.required],
      answer: ['', Validators.required],

      roles: ['']
      });
  }


  update() {
    const values = {...this.updateForm.value};
    this.accountService.update(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/splashPagePost');
      },
      error: error => {
        for(let i = 0; i < error.length; i++) {
          this.toastr.toastrConfig.timeOut = 15000;
          this.toastr.error(error[i]);
        }
      } 
    })
  }
  
  cancel() {
    this.router.navigateByUrl('/splashPagePost');
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset()))
      .toISOString().slice(0,10);
  }

}
