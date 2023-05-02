using API.Data;
using API.Interfaces;
using API.models;
using API.Repository;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
                 IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseSqlServer(config.GetConnectionString("DbConnectionString"));
            });
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddTransient<ILogService, LogService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProjectsRepository, ProjectsRepository>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            return services;
        }

    }
}