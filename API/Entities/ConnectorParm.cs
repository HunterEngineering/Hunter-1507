using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

namespace API.Data
{
    public class ConnectorParm : EntityBase
    {
        public ConnectorParm()
        {
        }

        public string ConnectorType { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string ParmType { get; set; }
        public int Order { get; set; }
        public int NestingLevel { get; set; }
        public string ObjectReference { get; set; }

    }
}
