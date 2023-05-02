import { CacheService } from './../services/cache.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarService } from '../services/nav-bar.service';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.scss']
})
export class NavBarComponent implements OnInit {
  messageText = '';
  welcomeName = '';

  constructor(
    public account: AccountService, private fb: UntypedFormBuilder,
              public http: HttpClient, public cache: CacheService,
              public router: Router, public navSvc: NavBarService
  ) { }
  loginForm: any;
  loginStatus: any;

  ngOnInit(): void {
    this.navSvc.navInit();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',
        [Validators.required, Validators.minLength(7), Validators.maxLength(40)]],
    });

    this.account.accountLoginSuccess.subscribe(successStatus => {
      this.loginStatus = successStatus;
      this.welcomeName = this.cache.StorageGet('knownAs') ?? ' ';
      if (this.loginStatus) {
        this.router.navigateByUrl('/splashPagePost');
      } else {
        this.router.navigateByUrl('/splashPage');
      }
    })
  }

  login() {
    var username = this.loginForm.get('username').value;
    var password = this.loginForm.get('password').value;
    this.loginForm.get('username').setValue('');
    this.loginForm.get('password').setValue('');

    this.account.loginAsync(username, password);
  }

  logout()
  {
    this.loginForm.get('username').setValue('');
    this.loginForm.get('password').setValue('');

    this.navSvc.logout();
    this.router.navigateByUrl('/splashPage');
  }

  showHelp() {
    
  }

}
