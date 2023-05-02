using API.Entities;

namespace API.Data
{
    public class ConnectorParms : EntityBase
    {
        public ConnectorParms()
        {
        }

        public string IndividualConnector { get; set; }
        public List<ConnectorParm> Parms { get; set; }
    }
}
