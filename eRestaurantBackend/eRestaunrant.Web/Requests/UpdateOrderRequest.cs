using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Requests
{
    public class UpdateOrderRequest
    {
        [JsonProperty("orderGuid")]
        public string OrderGuid { get; set; }
        [JsonProperty("status")]
        public int Status { get; set; }
    }
}
