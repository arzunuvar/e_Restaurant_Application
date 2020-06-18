using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Requests
{
    public class SetCommentRequest
    {
        [JsonProperty("restaurantGuid")]
        public string RestaurantGuid { get; set; }
        [JsonProperty("orderGuid")]
        public string OrderGuid { get; set; }
        [JsonProperty("content")]
        public string Content { get; set; }
        [JsonProperty("rating")]
        public int Rating { get; set; }
    }
}
