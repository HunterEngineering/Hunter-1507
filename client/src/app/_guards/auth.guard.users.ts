import { AuthenticateService } from '../services/authenticate.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserNotificationService } from '../services/user-notification.service';
import { CacheService } from '../services/cache.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardUsers implements CanActivate {
  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private toastr: ToastrService, 
    private cache: CacheService
  ) {}

  canActivate(): boolean {
    if (
      this.cache.StorageGet('token') !== null &&
      this.cache.StorageGetBool('navUser') === true
    ) 
    {
      return true;
    }

    this.toastr.error('Must login as user role to access this path');
    this.router.navigate(['/splashPage']);
    return false;
  }
}
