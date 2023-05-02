using System.Text.Json;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    //    [Authorize]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _configuration;
        private readonly ILogService _logService;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public AccountController(
            UserManager<AppUser> userManager,
            ITokenService tokenService, 
            IConfiguration configuration,
            ILogService LogService,
            DataContext context,
            IMapper mapper)
        {
            _userManager = userManager;
            _configuration = configuration;
            _logService = LogService;
            _mapper = mapper;
            _context = context;
            _tokenService = tokenService;
        }

//        [Authorize(Roles = "Admin")]        
        [HttpPost("register")]  // POST: api/account/register
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username already exists");

            AppUser user = _mapper.Map<AppUser>(registerDto);

            user.UserName = user.UserName.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            
            var RolesList = registerDto.Roles.Split(", ");
            foreach (var role in RolesList)
            {
                var roleResult = await _userManager.AddToRoleAsync(user, role);
                if (!roleResult.Succeeded) return BadRequest(result.Errors);
            }

            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                FirstName= user.FirstName, 
                LastName= user.LastName
            });
        }

        //        [Authorize(Roles = "Admin")] 
        [HttpPut("update")]
        public async Task<ActionResult> Update([FromBody] RegisterDto registerDto)
        {
            AppUser user = _mapper.Map<AppUser>(registerDto);

            user.UserName = user.UserName.ToLower();

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody]LoginDto loginDto)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("invalid username");

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized("Invalid password");

            var rolesObj = await _userManager.GetRolesAsync(user);
            var rolesLinks = JsonSerializer.Serialize(rolesObj);
                
            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                FirstName= user.FirstName,
                LastName= user.LastName,
                Roles= rolesLinks
            });
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}