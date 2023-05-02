export class ProjectDto
{
    public  id!: number;
    public  title!:  string;
    public  amIaGhost: boolean = false;
    public  idOfMyBody?: number;  // id of the Project that this is a ghost of
    public  description?:  string;
    public  solutionType?:  string;
    public  isGhosting:  boolean = false;
    public  sizeOfGhostPopulation:  number = 0;  // number of ghosts
    public  ghostingStart:  number = 1;
    public  ghostLifespan?:  number;
    public  isGhostingStagger:  boolean = false;
    public  staggerInterval:  number = 1;
    public  isPopulationMixVariable: boolean = false;
    public  popMixVariesByPercent?: number;
    public  mutationRate?: number;

    public  isPopulationSizeVariable: boolean = false;
    public  popSize: number = 50;
    public  popSizeVariance?: number;

    public  fitness?: number;
    public  socialStatus?: number;

}
