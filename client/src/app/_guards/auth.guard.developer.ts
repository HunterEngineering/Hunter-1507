import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';
import { CacheService } from '../services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardDevelopers implements CanActivate {
  constructor(private accountService: AccountService, 
      private toastr: ToastrService, 
      private cache: CacheService,
      private router: Router )
  { }

  canActivate(): boolean {
    if (
      this.cache.StorageGet('token') !== null &&
      this.cache.StorageGetBool('navDeveloper') === true
    ) {
      return true;
    }

    this.toastr.error('Must login as developer to access this path');
    this.router.navigate(['/splashPage']);
    return false;
  }
}

