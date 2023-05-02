import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactUsForm!: FormGroup;
  isSubmitted: boolean;

  constructor() {
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.contactUsForm = new FormGroup({
       'email': new FormControl('', [Validators.required, Validators.email]),
       'phone': new FormControl(''),
       'message': new FormControl('', [Validators.required, Validators.minLength(10)])
   });

  }

  get f() { return this.contactUsForm.controls; }

  submitContactUs() {
    this.isSubmitted = true;
    // let url = environment.apiUrl;
    // url = url + 'Contacts/SendNewMessage';

    // const msg = new UserSendMsg();
    // msg.email = this.f.email.value;
    // msg.phone = this.f.phone.value;
    // msg.message = this.f.message.value;

    // this.http.post(url, msg).subscribe(() => {
    //   console.log('OK');
    // });
  }

}
