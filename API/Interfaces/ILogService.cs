using API.models;

namespace API.Interfaces
{
    public interface ILogService
    {
        void LogMessage(MsgType msgType, string description);
    }
}
