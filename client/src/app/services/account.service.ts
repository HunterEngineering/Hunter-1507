import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CacheService } from './cache.service';
import { Router } from '@angular/router';

import { UserDto } from '../dtos/userDto';
import { ToastrService } from 'ngx-toastr';
import { appUser } from '../entities/User';
import { FormBuilder } from '@angular/forms';
import { registerUserDto } from '../dtos/registerUserDto';
import { loginDto } from '../dtos/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  baseUrl: string | undefined; //= '';
  accountLoginKnown = new BehaviorSubject('');
  accountLoginSuccess = new BehaviorSubject(false);
  NextToBeUpdated = new BehaviorSubject(0);
  private currentUserSource = new BehaviorSubject<appUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, 
    private cache: CacheService, private toastr: ToastrService, 
    private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.baseUrl = this.cache.getBaseUrl();
  }

  register(userDto: registerUserDto) {
    return this.http.post<appUser>(this.baseUrl + 'account/register', userDto).pipe(
      map ( user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  update(userDto: registerUserDto) {
    return this.http.put<appUser>(this.baseUrl + 'account/update', userDto).pipe(
      map ( user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: appUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }


  async loginAsync(userName: string, pass: string) {
    this.baseUrl = this.cache.getBaseUrl();

    var dto: loginDto = new loginDto(userName, pass);

    this.http.post<UserDto>(this.baseUrl + 'account/login', dto).subscribe({
        next: (response: UserDto) => {
          this.toastr.success("Logged In Successfully", "", { positionClass: 'toast-bottom-right' });
          var userName = response.username;
          var token = response.token;
          var knownAs = response.knownAs;
          var firstName = response.firstName;
          var lastName = response.lastName;
          var rolesList = response.roles; 

          this.cache.cacheUser(userName, token, knownAs, firstName, lastName, rolesList);

          this.accountLoginSuccess.next(true);
     
          this.route.navigateByUrl('/splashPagePost');
          },
        error: (error) => {
          this.toastr.error("Invalid Login", "",  { positionClass: 'toast-bottom-right' });
          this.cache.setUserLoginStatus('navVisitor');
          this.cache.StorageSetBool('navUser', false);
          this.accountLoginKnown.next('');
          this.accountLoginSuccess.next(false);

          this.route.navigateByUrl('/splashPage');
          }
        }
      );
    }
  }

