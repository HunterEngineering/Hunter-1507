import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAdminDto } from 'src/app/dtos/userAdminDto';
import { AccountService } from 'src/app/services/account.service';
import { CacheService } from 'src/app/services/cache.service';
import { RequestUserService } from 'src/app/services/request-user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrls: ['./admin-manage-user.component.css']
})
export class AdminDeleteUserComponent implements OnInit {
  usersList: UserAdminDto[] = [];
  baseUrl: string = '';
  private readonly _reqSvc: RequestUserService;
  private readonly _cache: CacheService;
  private screenUpdate: any = false;

  maxFixedTemplates: number = 10;

  constructor(private http: HttpClient,
              private router: Router,
              private reqSvc: RequestUserService,
              private acctSvc: AccountService,
              private cache: CacheService) 
              { 
                this._reqSvc = this.reqSvc;
                this._cache = this.cache;            
              }

  ngOnInit(): void {
    this.baseUrl = environment.apiUrl;
    this._reqSvc.refreshUsersList.next(true);

    this._reqSvc.refreshUsersList.subscribe((doRefresh: boolean) => {
      if (doRefresh == true) {
        this.getUsersList();
      }
    });

  }

  getUsersList() {
    var url = this.baseUrl + 'Users/GetAllUsers/';
    this.http.get<UserAdminDto[]>( url )
      .subscribe({
      next: (response: UserAdminDto[]) =>
      {
        this.usersList = response;
        this._reqSvc.refreshUsersList.next(false);
      },
      error: (err) =>
      {
        console.log(err);
      }
    });
  }

  UserSelected(id: number)
  {
    this.acctSvc.NextToBeUpdated.next(id);
    // let url = 'https://localhost:7270/api/Users/GetUserById/13';
    // this.http.get(url).subscribe((response) => {
    //   next: { console.log(response.toString());}
    // }
    //)

    this.router.navigateByUrl('/adminUpdateUser');
  }

  UserDelete(id: number)
  {
    this._reqSvc.DeleteUser(id);
  }

  cancel()
  {
    this.router.navigateByUrl('/splashPagePost');
  }

}
