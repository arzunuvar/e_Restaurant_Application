using Newtonsoft.Json;

namespace eRestaunrant.Web.Responses
{
    public class RestaurantDto
    {
        [JsonProperty("guid")]
        public string Guid { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("logo")]
        public string Logo { get; set; }
        [JsonProperty("rating")]
        public double Rating { get; set; }
    }
}
