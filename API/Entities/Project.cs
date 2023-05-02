using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Project : EntityBase
    {
        public Project()
        {
        }

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
        public int MutationRate { get; set; }

        // Population
        public int PopSize { get; set; }
		public bool IsPopulationSizeVariable { get; set; }
        public int PopSizeVariance { get; set; }
		public bool IsPopulationMixVariable { get; set; }
		public int PopMixVariesByPercent { get; set; }

        // Individual
        public double Fitness { get; set; }
        public int SocialStatus { get; set; }

        // Project Owner
        public int OwnerId { get; set; }

    }
}
