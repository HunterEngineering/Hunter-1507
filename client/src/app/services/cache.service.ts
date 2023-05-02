import { Injectable } from '@angular/core';
import { appUser } from '../entities/User';
import { HttpClient } from '@angular/common/http';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ProjectDto } from '../dtos/ProjectDto';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  baseUrl: string = '';
  baseUrlS: string = '';

  constructor(private http: HttpClient, private route: Router) {
  }

  cacheUser(userName: string, token: string, knownAs: string, firstName: string, lastName: string, rolesList: string ) {
    localStorage.setItem('username', userName);
    localStorage.setItem('token', token);
    localStorage.setItem('knownAs', knownAs);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('roles', rolesList);
    localStorage.setItem('loggedIn', 'true');
    this.setUserStatusByRoles();
  }

  removeUser() {
    this.clearUserLoginStatus();
    this.setUserLoginStatus('navvisitor');
  }

  setBaseUrl(url: string) {
    localStorage.setItem('baseurl', url);
  }

  getBaseUrl(): string {
    return localStorage.getItem('baseurl')?? '';
  }

  clearUserLoginStatus()
  {
    this.StorageSetBool('loggedIn', false);
    this.StorageSetBool('navUser', false);
    this.StorageSetBool('navDeveloper', false);
    this.StorageSetBool('navVisitor', false);
    this.StorageSetBool('navAdmin', false);
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('knownAs');
  }

  setUserStatusByRoles() {
    this.StorageSetBool('navUser', false);
    this.StorageSetBool('navDeveloper', false);
    this.StorageSetBool('navAdmin', false);

    var roles = localStorage.getItem('roles');  
    var rolesLower = roles?.toLowerCase();

    if (rolesLower?.includes('admin'))  this.setUserLoginStatus('navadmin');
    if (rolesLower?.includes('developer'))  this.setUserLoginStatus('navdeveloper');
    if (rolesLower?.includes('user'))  this.setUserLoginStatus('navuser');
    var loginStatus = (rolesLower?.includes('admin')) || (rolesLower?.includes('user')) ? true : false;
    this.StorageSetBool("loggedIn", loginStatus);
  }

  setUserLoginStatus(status: string) {
    switch (status.toLowerCase()) {
      case 'navuser':
        this.StorageSetBool('navUser', true);
        this.StorageSetBool('loggedIn', true);
        break;
      case 'navdeveloper':
        this.StorageSetBool('navUser', true);
        this.StorageSetBool('navDeveloper', true);
        break;
      case 'navvisitor':
        this.StorageSetBool('navVisitor', true);
        break;
      case 'navadmin':
        this.StorageSetBool('navAdmin', true);
        this.StorageSetBool('navUser', true);
        this.StorageSetBool('loggedIn', true);
        break;
      case 'none':
        this.clearUserLoginStatus();
        break;
    }
  }

  isUserAdmin() {
    return this.StorageGetBool('navAdmin');  
  }

  isUserDeveloper() {
    return this.StorageGetBool('navDeveloper');
  }

  isUserUser() {
    return this.StorageGetBool('navUseer');  }

  getUserLoginStatus() {
    if (this.StorageGetBool('navAdmin') === true)
      return 'navAdmin';
    if (this.StorageGetBool('navDeveloper') ===  true) 
        return 'navDeveloper';
    if (this.StorageGetBool('navUser') === true) 
          return 'navUser';
    if (this.StorageGetBool('navVisitor') === true)
            return 'navVisitor';
    return 'none';
  }
  
  loggedOut() {
    this.removeUser();
    this.route.navigate(['/splashPage']);
  }

  StorageSet(key: string, value: string) {
    // storage values must be strings
    localStorage.setItem(key, value); // store the value as a string
  }
  
  StorageSetBool(key: string, value: boolean) {
    // storage values must be strings
    const storeValue = value ? 'true' : 'false';
    localStorage.setItem(key, storeValue); // store the value as a string
    return value; // return the original value
  }
  
  StorageSetNumber(key: string, value: number) {
    const szNumber = value.toString();
    localStorage.setItem(key, szNumber);
  }

  StorageGet(key: string) {
    const result = localStorage.getItem(key);
    return result;
  }
  
  StorageGetBool(key: string) {
    const result = localStorage.getItem(key);
    const retVal = result === 'true' ? true : false;
    return retVal;
  }
  
  StorageGetNumber(key: string) {
    const num = localStorage.getItem(key);
    const szNum = num != null ? num.toString() : '';
    return szNum;
  }

  StorageDelete(key: string) {
    localStorage.removeItem(key);
  }

  StorageSetProject( project: ProjectDto  ) {
    localStorage.setItem( 'project', JSON.stringify(project) );
  }

  StorageGetProject(key: string) {
    var szJson = localStorage.getItem(key) ?? '{ }';
    return JSON.parse(szJson);
  }

}
