using API.Interfaces;

namespace API.models
{
    public enum MsgType { Information, Warning, Error, Danger, Exception, Important };
    public class LogService : ILogService
    {

        public async void LogMessage(MsgType msgType, string description)
        {
            var when = DateTime.Now.ToString();
            when = when.Replace('/', '-');

            var logMsg = when + ": " + msgType.ToString() + " - " + description;
            string[] dateOnly = when.Split(' ');

            string docPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
            string fileName = "log_" + dateOnly[0] + ".txt";
            string filePath = docPath + @"\" + fileName;
            if (!File.Exists(filePath))
            {
                using (StreamWriter sw = File.CreateText(filePath))
                {
                    sw.WriteLine($"Log Messages as of {when}");
                }
            }

            using (StreamWriter outputFile = File.AppendText(filePath))
            {
                await outputFile.WriteLineAsync(logMsg);
            }
        }
    }
}
