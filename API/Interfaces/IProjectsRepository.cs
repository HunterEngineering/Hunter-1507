using API.Entities;

namespace API.Interfaces
{
    public interface IProjectsRepository
    {
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Project>> GetProjectsAsync();
        Task<Project> GetProjectByIdAsync(int id);
        Task<Project> GetProjectByTitleAsync(string title);
        Task<bool> ProjectExistsAsync(int id);
        Task<bool> DeleteProjectAsync(int id);
        void UpdateProjectAsync(Project project);
    }
}