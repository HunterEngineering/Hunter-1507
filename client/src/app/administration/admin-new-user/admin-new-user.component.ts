import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appuserDto } from 'src/app/dtos/appuserDto';
import { AccountService } from 'src/app/services/account.service';
import { RequestUserService } from 'src/app/services/request-user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.css']
})
export class AdminNewUserComponent implements OnInit {
  private editAlertService: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  userToUpdate!: appuserDto;
  RegisterOrUpdate = "Register";
  idToBeUpdated: number = 0;

  // form fields -- see ngModel
  formFields: appuserDto = new appuserDto(); // for ngModel in html
  confirmPassword: string = '';
  trialbegan: string = '';
  trialend: string = '';

  constructor(private accountService: AccountService, private toastr: ToastrService, 
    private fb: FormBuilder, private router: Router, private reqsvc: RequestUserService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.RegisterOrUpdate = this.idToBeUpdated == 0 ? "Register" : "Update";

    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', 
        [Validators.required, Validators.minLength(8), Validators.maxLength(40) ]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
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
      
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })

  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  register() {
    let values = {...this.registerForm.value};
    values.trialbegan = values.trialbegan ?? '';
    values.trialend = values.trialend ?? '';
    values.trialbegan = values.trialbegan.length == 0 ? new Date() : this.userToUpdate.trialbegan;
    values.trialend = values.trialend.length == 0 ? new Date() : this.userToUpdate.trialend;
    if (values.roles.length == 0)
      values.roles = "User";

    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/splashPagePost');
      },
      error: err => {
        for(let i = 0; i < err.error.length; i++) {
          this.toastr.toastrConfig.timeOut = 15000;
          this.toastr.error(err.error[i].description);
        }
      } 
    })
  }

  cancel() {
    this.accountService.NextToBeUpdated.next(0);
    this.router.navigateByUrl('/splashPagePost');
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset()))
      .toISOString().slice(0,10);
  }

}
