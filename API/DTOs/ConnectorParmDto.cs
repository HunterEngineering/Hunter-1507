namespace API.DTOs
{
    public class ConnectorParmDto
    {
        public int Id   { get; set; }
        public string ConnectorType { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string ParmType { get; set; }
        public int Order { get; set; }
        public int NestingLevel { get; set; }
        public string ObjectReference { get; set; }

    }
}
