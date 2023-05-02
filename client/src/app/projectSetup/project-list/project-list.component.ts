import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectDto } from 'src/app/dtos/ProjectDto';
import { Router } from '@angular/router';
import { RequestProjectService } from "../../services/request-project.service";
import { CacheService } from 'src/app/services/cache.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectList: ProjectDto[] = [];
//  nonTemplatesList: ProjectDto[] = [];
  maxFixedTemplates: number = 10;

  private _reqSvc: RequestProjectService;
  private readonly _cache: CacheService;
  private screenUpdate: any = false;
  private baseUrl: string = '';

  constructor(private http: HttpClient,
              private router: Router,
              private reqSvc: RequestProjectService,
              private cache: CacheService)
  {
    this._reqSvc = reqSvc;
    this._cache = cache;
  };

  ngOnInit(): void {
    this.baseUrl = environment.apiUrl;
    this._reqSvc.refreshProjectList.next(true);

    this._reqSvc.refreshProjectList.subscribe((doRefresh) => {
      if (doRefresh == true) {
        this.getProjectsList();
      }
    });
  };

  getProjectsList() {
    this.http.get<ProjectDto[]>(this.baseUrl + 'Projects/GetAllProjects/' ).subscribe({
      next: (response: ProjectDto[]) =>
      {
        this.projectList = response;
        // for (let i = 0; i < this.projectList.length; i++) {
        //   if (this.projectList[i].id > this.maxFixedTemplates)
        //     this.nonTemplatesList.push(this.projectList[i]);
        // }
        this._reqSvc.refreshProjectList.next(false);
      },
      error: (err) =>
      {
        console.log(err);
      }
    });
  }

  ProjectTypeSelected(Id: number)
  {
    this._reqSvc.SetNewProject(Id);
    this.cache.StorageSet("ProjectToOpen", Id.toString());
    this.router.navigateByUrl("\createProject");
  };

  ProjectTypeDelete(id: number)
  {
    this._reqSvc.DeleteProject(id);
  }
}
