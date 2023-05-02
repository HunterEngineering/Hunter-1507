using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string KnownAs { get; set; }
        public string Roles { get; set; }
    }
}