import { Component, ElementRef, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectDto } from 'src/app/dtos/ProjectDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CacheService } from 'src/app/services/cache.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProjectRepository } from 'src/app/repositories/ProjectRepository';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
//  @Input() requestedId : number = -1;

  private readonly _cache: CacheService;
  private readonly _projRepo: ProjectRepository;

  projectId: number = -1;
  researchType: string = '';
  individualConnector: string = '';
  amIaGhost: boolean = false;
  idOfMyBody?: number;  // id of the Project that this is a ghost of
  description?:  string;
  solutionType?:  string;
  isGhosting:  boolean = false;
  sizeOfGhostPopulation:  number = 0;  // number of ghosts
  ghostingStart:  number = 1;
  ghostLifespan?:  number;
  isGhostingStagger:  boolean = false;
  staggerInterval:  number = 1;
  isPopulationMixVariable: boolean = false;
  popMixVariesByPercent?: number;
  mutationRate?: number;

  popSize: number = 50;
  isPopulationSizeVariable: boolean = false;
  popSizeVariance?: number;

  isDeveloper: boolean = false;
  isAdmin: boolean = false;
  isProjectRecordInDB: boolean = false;
  isGhostPopulation: boolean = false;
  isShowFeatures: boolean = false;
  isShowEvaluators: boolean = false;

  projectDto: ProjectDto = new ProjectDto();

  commentFC?: FormControl;
  checkToNOTSave: boolean = false;
  closeWITHOUTSave: boolean = false;
  projectTypeChanged: boolean = false;

  constructor(private http: HttpClient,
    private cache: CacheService,
    private toastr: ToastrService,
    private router: Router,
    private projRepo: ProjectRepository) 
    {       
      this._cache = cache;
      this._projRepo = projRepo;
    }

    ngOnInit(): void {
      this.projectDto.title = '';
      this.projectDto.description = '';
      this.projectTypeChanged = false;

      var requestedToOpen = this._cache.StorageGet("ProjectToOpen") ?? '0';
      this.projectId =  +requestedToOpen;


      if (this.projectId > 0) {
        this.projectDto.id = this.projectId;
        this.OpenProject();
      }
      this.isDeveloper = this.cache.isUserDeveloper();
      this.isAdmin = this.cache.isUserAdmin();
    }

    saveProjectType(projType: string) {
      this.projectDto.solutionType = projType;
      this.projectTypeChanged = true;

    }

    toggleGhostPopulation() {
      this.isGhostPopulation = !this.isGhostPopulation;
    }
    toggleFeatures() {
      this.isShowFeatures = !this.isShowFeatures;
    }
    toggleEvaluators() {
      this.isShowEvaluators = !this.isShowEvaluators;
    }

    Close()
    {
      this.cache.StorageSet("ProjectToOpen", "0");
      if (this.closeWITHOUTSave || this.checkToNOTSave)
      {
        if ((this.projectDto.title.length > 0) ||
          (this.projectDto.description != null && this.projectDto.description.length > 0) ||
          (this.projectTypeChanged))
        {
          this.checkToNOTSave = true;
        } 
        else
        {
          this.router.navigateByUrl("/splashPagePost");
        }
      } else
      {
        this.router.navigateByUrl("/splashPagePost");
      }
    }

    DontSAVE()
    {
      this.checkToNOTSave = false;
      this.closeWITHOUTSave = true;
      this.Close();
    }

    OpenProject() {
      var baseUrl = environment.apiUrl;
      this.http.get<ProjectDto>(baseUrl + 'Projects/GetProject/' + this.projectDto.id )
        .subscribe({
          next: (response: ProjectDto) => {
            this.projectDto = response;
            this.projectId = response.id;
            this.isProjectRecordInDB = true;
            this.cache.StorageSetProject(response);
            },
          error: (err) => {
             console.log(err);
             this.toastr.error("Invalid Project Id ?", "",  { positionClass: 'toast-bottom-right' });
            }
      });
    }

    Save()
    {
      this.cache.StorageSet("ProjectToOpen", "0");
      
      this.checkToNOTSave = false;
      this.projectTypeChanged = false;

      var result = this.projRepo.saveProject(this.isProjectRecordInDB, this.projectDto);

      this.isProjectRecordInDB = result.recordInDb;
      this.projectId = result.Id;
    }

}

