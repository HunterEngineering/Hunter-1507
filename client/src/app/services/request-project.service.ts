import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class RequestProjectService {
  public showProject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public refreshProjectList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private cache: CacheService,
              private toastr: ToastrService) { }

  baseUrl: string = '';

  public SetNewProject(id: number)
  {
    this.showProject.next(id);
  }

  DeleteProject(id: number)
  {
    this.baseUrl = this.cache.getBaseUrl();
    var url = `${this.baseUrl}Projects/DeleteProject/${id.toString()}`;
    this.http.delete(url).subscribe({
      next: () => { 
        this.toastr.info("Delete Completed");
        this.refreshProjectList.next(true);
        },
      error: (err) => { this.toastr.error("Error: " + err)}
    });
  }

}
