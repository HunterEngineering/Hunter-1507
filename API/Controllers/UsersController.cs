using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        public IUserRepository _userRepository { get; }
        public IMapper _mapper { get; }

        public UsersController(IUserRepository userRepository, UserManager<AppUser> userManager, 
            ITokenService tokenService, IMapper mapper)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

//        [Authorize(Roles = "Admin")]
        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetAllUsers()
        {
            var users = await _userRepository.GetMembersAsync();


            return Ok(users);
        }

//        [Authorize(Roles = "Admin")]
        [HttpGet("GetUser/{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        //        [Authorize(Roles = "Admin")]
        [HttpGet("GetUserById/{Id}")]
        public async Task<ActionResult<AppUser>> GetUser(int Id)
        {
            return await _userRepository.GetUserByIdAsync(Id);
        }
        
        //        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteUser/{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            AppUser user = await _userManager.FindByIdAsync(id.ToString());
            if (user != null)
            {
                IdentityResult result = await _userManager.DeleteAsync(user);
            }

            return Ok();
        }
    }
}