using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.DTOs;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly ILogService _logService;

        public LogController(ILogService LogService)
        {
            _logService = LogService;
        }

        // POST: api/Log/Note
        [HttpPost]
        [Route("Note")]
        public void Note(LogMessageDto logMsgDto)
        {
            _logService.LogMessage(logMsgDto.msgType, logMsgDto.Message);
        }
    }
}
