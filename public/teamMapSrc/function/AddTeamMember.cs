using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace CheckDenFakt.Maps.TeamMember
{
    public static class AddTeamMember
    {
        [FunctionName("AddTeamMember")]
        [return: Table("Members")]
        public static TeamMember Post(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] dynamic member,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = member.Name;
            TeamMember teamMember = new TeamMember("CheckDenFakt", name){
                Country = member.Country,
                Description = member.Description,
                State = member.State,
                Street = member.Street,
                ImageUrl = member.ImageUrl,
                Latitude = member.Latitude,
                Longitude = member.Longitude,
                City = member.City
            };

            return teamMember;
        }
    }
}
