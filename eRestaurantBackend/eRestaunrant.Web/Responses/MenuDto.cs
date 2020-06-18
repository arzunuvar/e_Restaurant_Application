using Newtonsoft.Json;

namespace eRestaunrant.Web.Responses
{
    public class MenuDto
    {
        [JsonProperty("restaurantGuid")]
        public string RestaurantGuid { get; set; }

        [JsonProperty("guid")]
        public string Guid { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("logo")]
        public string Logo { get; set; }
        [JsonProperty("count")]
        public int Count { get; set; } = 1;
        [JsonProperty("amount")]
        public decimal Amount { get; set; }
        [JsonProperty("type")]
        public int Type { get; set; }
    }
}
