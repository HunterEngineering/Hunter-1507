namespace API.Entities
{
    public class Feature
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Definitions { get; set; }
        public int ProjectOwnerId { get; set; }
    }
}
