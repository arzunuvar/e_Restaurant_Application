using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Requests
{
    public class AddRestaurantRequest
    {
        [JsonProperty("guid")]
        public string Guid { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("logo")]
        public string Logo { get; set; }
        [JsonProperty("address")]
        public string Address { get; set; }
        [JsonProperty("lat")]
        public double Lat { get; set; }
        [JsonProperty("lng")]
        public double Lng { get; set; }
    }
}
