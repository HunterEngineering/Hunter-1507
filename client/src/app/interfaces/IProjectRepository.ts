import { ProjectDto } from "../dtos/ProjectDto";

export interface IProjectRepository {
    saveProject(isProjectRecordInDB: boolean, projectDto: ProjectDto) 
        : { recordInDb: boolean, Id: number  };
}
