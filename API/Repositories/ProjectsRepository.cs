using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ProjectsRepository : IProjectsRepository
    {
        private readonly DataContext _context;
        public ProjectsRepository(DataContext context)
        {
            _context = context;
            
        }
        public async Task<bool> DeleteProjectAsync(int id)
        {
            var result = false;
            var project = await _context.Projects.FindAsync(id);
            if (project != null)
            {
                _context.Projects.Remove(project);
                _context.SaveChanges();
                result = true;
            }
            return result;
        }

        public async Task<IEnumerable<Project>> GetProjectsAsync()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task<Project> GetProjectByIdAsync(int id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<Project> GetProjectByTitleAsync(string title)
        {
            return await _context.Projects.FirstOrDefaultAsync(x => x.Title == title);
        }

        public async Task<bool> ProjectExistsAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            return project != null;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateProjectAsync(Project project)
        {
            _context.Entry(project).State = EntityState.Modified;
        }
    }
}