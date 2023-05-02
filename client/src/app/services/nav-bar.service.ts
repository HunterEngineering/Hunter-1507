import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor(public cache: CacheService,) { }

  navInit() {
    this.cache.StorageSetBool("navAdmin", false);
    this.cache.StorageSetBool("navUser", false);
    this.cache.StorageSetBool("navVisitor", true);
    this.cache.StorageSetBool("loggedIn", false);
  }

  logout() {
    this.cache.clearUserLoginStatus();
    this.cache.setUserLoginStatus('NavVisitor');
  }
}
