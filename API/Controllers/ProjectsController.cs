using Microsoft.AspNetCore.Mvc;
using API.Data;
using AutoMapper;
using API.DTOs;
using API.Repository;

using API.Interfaces;
using API.Entities;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly ProjectsRepository _repo;
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProjectsController(
            IMapper mapper,
            IProjectsRepository repo,
            UserManager<AppUser> userManager,
            DataContext context,
            IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _repo = (ProjectsRepository)repo;
            _context = context;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/GetAllProjects
        [HttpGet("GetAllProjects")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
        {
            var projectsApiDto = await _repo.GetProjectsAsync();
            return Ok(projectsApiDto);
        }


        // GET: api/GetProject/5
        [HttpGet("GetProject/{id}")]
        [ProducesResponseType(typeof(ProjectDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProjectDto>> GetProject(int id)
        {
            var projectApiDto = await _repo.GetProjectByIdAsync(id);
            if (projectApiDto == null)
            {
                return NotFound();
            }
            return Ok(projectApiDto);
        }

        // GET: api/GetUserProjects
        [HttpGet("GetUserProjects")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetSelectableProjects()
        {
            var projectsApiDto = await _repo.GetProjectsAsync();
            return Ok(projectsApiDto);
        }

        // GET: api/GetConnectorParms/{dto}

        // PUT: api/Projects/UpdateProject/{dto}
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdatedProject")]
        public async Task<ActionResult<ProjectDto>> UpdateProject([FromBody]ProjectDto updatedProject)
        {
            Project project = await _context.Projects.FindAsync(updatedProject.Id);

            if (project is null)
            {
                return NotFound();
            }

            project.Title = updatedProject.Title;
            project.AmIaGhost = updatedProject.AmIaGhost;
            project.IdOfMyBody = updatedProject.IdOfMyBody;
            project.Description = updatedProject.Description;
            project.SolutionType = updatedProject.SolutionType;
            project.IsGhosting = updatedProject.IsGhosting;
            project.SizeOfGhostPopulation = updatedProject.SizeOfGhostPopulation;
            project.GhostingStart = updatedProject.GhostingStart;
            project.GhostLifespan = updatedProject.GhostLifespan;
            project.IsGhostingStaggered = updatedProject.IsGhostingStaggered;
            project.StaggerInterval = updatedProject.StaggerInterval;
            project.IsPopulationMixVariable = updatedProject.IsPopulationMixVariable;
            project.PopMixVariesByPercent = updatedProject.PopMixVariesByPercent;
            project.MutationRate = updatedProject.MutationRate;

            project.PopSize = updatedProject.PopSize;
            project.IsPopulationSizeVariable = updatedProject.IsPopulationSizeVariable;
            project.PopSizeVariance = updatedProject.PopSizeVariance;
            project.IsPopulationMixVariable = updatedProject.IsPopulationMixVariable;
            project.PopMixVariesByPercent = updatedProject.PopMixVariesByPercent;

            project.Fitness= updatedProject.Fitness;
            project.SocialStatus= updatedProject.SocialStatus;

            await _context.SaveChangesAsync();

            return Ok(updatedProject);
        }

        // POST: api/Projects/CreateProject/{dto}
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //       [Route("CreateProject/{dto}")]
        [HttpPost("CreateProject")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ProjectDto>> CreateProject([FromBody]ProjectDto createdto)
        {
            Project project = _mapper.Map<Project>(createdto);

            project.OwnerId = 0;
            var idAsString = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            project.OwnerId = Int32.Parse(idAsString);

            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            createdto.Id = project.Id;

            return Ok(createdto);
        }

        //POST: api/Projects/LaunchProject/{id}
        [HttpPost("LaunchProject")]
        public ActionResult LaunchProject(ProjectDto launchdto)
        {
            // UPDATE this with lazy loading
            // For now, the list of Hunters is hard coded
            switch (launchdto.SolutionType)
            {
                case "001":     // CBOT
                  //  var huntTarget = new ChicagoBoardOfTrade(dto);
                    break;
            }

            return Ok();
        }

        //  POST: api/Projects/CreateConnectorParm/{dto}
        [HttpPost("CreateConnectorParm")]
        public async Task<ActionResult<Data.ConnectorParm>> CreateConnectorParm(ConnectorParm parmDto)
        {
            await _context.ConnectorParms.AddAsync(parmDto);
            _context.SaveChanges();

            return CreatedAtAction("GetConnectorParms", new
            {
                id = parmDto.Id,
                parmDto.ConnectorType,
                parmDto.Name,
                parmDto.Value,
                parmDto.ParmType,
                parmDto.Order,
                parmDto.NestingLevel,
                parmDto.ObjectReference,
            }, parmDto);
        }


        // DELETE: api/Projects/DeleteProject/5
        [HttpDelete("DeleteProject/{id}")]
        public async Task<bool> DeleteProject(int id)
        {
            var result = await _repo.DeleteProjectAsync((int) id);
            return result;
        }

        [NonAction]
        private async Task<bool> ProjectExists(int id)
        {
            return await _repo.ProjectExistsAsync(id);
        }
    }
}
