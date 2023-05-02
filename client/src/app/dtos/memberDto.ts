import { ProjectDto } from "./ProjectDto";

export class memberDto {
    public id: number = 0;
    public UserName: string = '';
    public KnownAs: string = '';
    public Email: string = '';
    public Phone: string = '';
    public DateCreated!: Date;
    public DurationDays: number = 0;
    public Projects: ProjectDto[] = [];
}