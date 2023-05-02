using API.models;

namespace API.DTOs
{
    public class LogMessageDto
    {
        public MsgType msgType { get; set; }
        public string Message { get; set; }
    }
}
