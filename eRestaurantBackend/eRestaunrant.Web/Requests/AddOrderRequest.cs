using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Requests
{
    public class AddOrderRequest
    {
        [JsonProperty("restaurantGuid")]
        public string RestaurantGuid { get; set; }
        [JsonProperty("guid")]
        public string Guid { get; set; }
        [JsonProperty("count")]
        public int Count { get; set; } = 1;
        [JsonProperty("amount")]
        public decimal Amount { get; set; }
    }
}
