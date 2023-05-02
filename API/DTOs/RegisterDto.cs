using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MinLength(5)]
        public string Username { get; set; }
        [Required]
        [MinLength(10)]
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string KnownAs { get; set; }

        public bool CanTrial { get; set; }
        public string TrialBegan { get; set; }
        public string TrialEnd { get; set; }

        [Phone]
        public string Phone { get; set; }
        [Phone]
        public string AltPhone { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }

        public bool CCTypeUser { get; set; }
        public string NameOnCC { get; set; }
        public string CCNumber { get; set; }
        public string CCExpires { get; set; }
        public string CCAuthCode { get; set; }

        public string Question { get; set; }
        public string Answer { get; set; }

        // Roles are a list:  "User, Admin" - be sure to separate by comma-space
        public string Roles { get; set; }
    }
}