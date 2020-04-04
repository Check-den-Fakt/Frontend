using Microsoft.WindowsAzure.Storage.Table;

namespace CheckDenFakt.Maps.TeamMember
{
    public class TeamMember : TableEntity
    {
        public TeamMember(string teamName, string name)
        {
            this.PartitionKey = teamName;
            this.RowKey = name;
        }

        public TeamMember()
        {
        }

        public string ImageUrl { get; set; }

        public string Street  { get; set; }

        public string State { get; set; }

        public string Country { get; set; }

        public string Description { get; set; }

        public string Longitude { get; set; }

        public string Latitude { get; set; }

        public string City { get; set; }
    }
}