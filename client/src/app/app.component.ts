import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CacheService } from './services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Solution Hunter';
  users: any;
  baseUrl: any;

  constructor(private http: HttpClient, private cache: CacheService) { }

  ngOnInit(): void {
    this.baseUrl = environment.apiUrl;
    localStorage.clear();
    this.cache.setBaseUrl(this.baseUrl);
    this.cache.setUserLoginStatus('navVisitor');
    this.cache.StorageSetBool('loggedIn', false );
  }
}

