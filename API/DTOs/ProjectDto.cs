using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public bool AmIaGhost { get; set; }
        public int IdOfMyBody { get; set; }  // id of the Project that this is a ghost of
        public string Description { get; set; }
        public string SolutionType { get; set; }
        public bool IsGhosting { get; set; }
        public int SizeOfGhostPopulation { get; set; }  // number of ghosts
        public int GhostingStart { get; set; }
        public int GhostLifespan { get; set; }
        public bool IsGhostingStaggered { get; set; }
        public int StaggerInterval { get; set; }
        public bool IsPopulationMixVariable { get; set; }
        public int PopMixVariesByPercent  { get; set; }
        public int MutationRate { get; set; }

        // Population
        public int PopSize { get; set; }
        public bool IsPopulationSizeVariable { get; set; }  
        public int PopSizeVariance { get; set; }

        // Individual
        public double Fitness { get; set; }
        public int SocialStatus { get; set; }

        public int OwnerId { get; set;}
 
    }
}