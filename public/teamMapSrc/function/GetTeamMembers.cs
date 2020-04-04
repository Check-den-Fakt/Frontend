using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage;
using System.Collections.Generic;

namespace CheckDenFakt.Maps.TeamMember
{
    public static class GetTeamMembers
    {
        [FunctionName("GetTeamMembers")]
        public static async Task<List<TeamMember>> GetMembersAsync(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest request, ILogger log, [Table("Members")] CloudTable cloudTable)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
           
            #region Null Checks
            if (cloudTable == null)
            {
                throw new ArgumentNullException(nameof(cloudTable));
            }
            #endregion
            
            try
            {
                TableQuery<TeamMember> rangeQuery = new TableQuery<TeamMember>().Where(
                    TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "CheckDenFakt"));

                List<TeamMember> lists = new List<TeamMember>();

                // Execute the query and loop through the results
                foreach (var entity in await cloudTable.ExecuteQuerySegmentedAsync(rangeQuery, null).ConfigureAwait(false))
                {
                    lists.Add(entity);
                }

                return lists;
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                log.LogDebug(ex.StackTrace);
                throw;
            }
        }
    }
}
