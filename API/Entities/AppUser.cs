using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string KnownAs { get; set; }

        public bool CanTrial { get; set; }
        public DateTime TrialBegan { get; set; }
        public DateTime TrialEnd { get; set; }

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


        public List<Project> Projects { get; set; } = new();

        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}