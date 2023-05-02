using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context, 
                UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await context.Users.AnyAsync()) return;  // users already present, then exit

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>
            {
                new AppRole { Name = "Admin"},
                new AppRole { Name = "Developer"},
                new AppRole { Name = "User"}
            };

            foreach (var role in roles )
            {
                await roleManager.CreateAsync(role);
            }

            foreach (AppUser user in users )
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Test$12345");
                await userManager.AddToRoleAsync(user, "User");

                if (user.UserName == "admin")
                {
                    await userManager.AddToRoleAsync(user, "Admin");
                    await userManager.AddToRoleAsync(user, "Developer");
                }
            }

        }
    }
}
