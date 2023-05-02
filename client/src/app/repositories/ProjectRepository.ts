import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ProjectDto } from "../dtos/ProjectDto";
import { CacheService } from "../services/cache.service";
import { IProjectRepository } from "../interfaces/IProjectRepository";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ProjectRepository implements IProjectRepository {
    baseUrl: string = '';
    projectId: number = 0;
    recordInDb: boolean = false;

    constructor(private http: HttpClient, private cache: CacheService, private toastr: ToastrService) { }

    public saveProject(isProjectRecordInDB: boolean, projectDto: ProjectDto) : { recordInDb: boolean, Id: number  } {
        this.baseUrl = environment.apiUrl;
        this.recordInDb = isProjectRecordInDB;

        if ( this.recordInDb ) {
          this.http.put<ProjectDto>(this.baseUrl + 'Projects/UpdatedProject', projectDto).subscribe({
            next: (response: ProjectDto) => {
                  this.projectId = response.id;
                  this.cache.StorageSetProject(response);
                  isProjectRecordInDB = true;
                  },
            error: (err) => { console.log(err); },
            });
        }
        else {
          this.http.post<ProjectDto>(this.baseUrl + 'Projects/CreateProject', projectDto).subscribe({
            next: (response: ProjectDto) => {
                  this.projectId = response.id;
                  this.cache.StorageSetProject(response);
                  isProjectRecordInDB = true;
                  },
            error: (err) => {
              console.log(err);
              isProjectRecordInDB = false;
            },
            });
         }

         this.toastr.success('Project Saved');
         return { recordInDb: this.recordInDb, Id: this.projectId };
    }
}
