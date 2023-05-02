using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string KnownAs { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Phone]
        public string Phone { get; set; }
        public DateTime DateCreated { get; set; }
        public int DurationDays { get; set; }   
        public List<ProjectDto> Projects { get; set; }
    }
}