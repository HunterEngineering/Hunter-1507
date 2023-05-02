import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { appuserDto } from '../dtos/appuserDto';
import { UserDto } from '../dtos/userDto';
import { appUser } from '../entities/User';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class RequestUserService {
  public userDtoToShow: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>(new UserDto());
  public refreshUsersList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public UserToDOMisReady: BehaviorSubject<appuserDto> = new BehaviorSubject<appuserDto>(new appuserDto());
  

  constructor(private http: HttpClient,
              private cache: CacheService,
              private toastr: ToastrService) { }

  baseUrl: string = '';

  public GetUser(id: number) //: {user: appuserDto}
  {
    this.baseUrl = this.cache.getBaseUrl();
    var selectedUser = new appuserDto();
    var url = `${this.baseUrl}Users/GetUserById/${id.toString()}`;

    this.http.get(url).subscribe({
      next: (response: any) => {
        selectedUser.userName = response.userName;
        selectedUser.firstName = response.firstName;
        selectedUser.lastName = response.lastName;
        selectedUser.knownAs = response.knownAs;
        selectedUser.phone = response.phone;
        selectedUser.city = response.city;
        selectedUser.state = response.state;
        selectedUser.country = response.country;
        selectedUser.email = response.email;
        selectedUser.canTrial = response.canTrial;
        selectedUser.trialbegan = response.trialbegan;
        selectedUser.trialend = response.trialend;
        selectedUser.ccTypeUser = response.ccTypeUser;
        selectedUser.nameOnCC = response.nameOnCC;
        selectedUser.ccNumber = response.ccNumber;
        selectedUser.ccExpires = response.ccExpires;
        selectedUser.ccAuthCode = response.ccAuthCode;
        selectedUser.question = response.question;
        selectedUser.answer = response.answer;

        this.UserToDOMisReady.next(selectedUser);
      },
      error: (err) => {
        selectedUser.answer = err.Message();
      }
    });

    return selectedUser;
  }

  DeleteUser(id: number)
  {
    this.baseUrl = this.cache.getBaseUrl();
    var url = `${this.baseUrl}Users/DeleteUser/${id}`;
    this.http.delete(url).subscribe({
      next: () => { 
        this.toastr.info("Delete Completed");
        this.refreshUsersList.next(true);
        },
      error: (err) => {
        for(let i = 0; i < err.error.length; i++) {
          this.toastr.toastrConfig.timeOut = 15000;
          this.toastr.error(err.error[i].description);
        }
      }
    });
  }

}
