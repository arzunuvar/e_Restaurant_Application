using eRestaurant.Model.Enum;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Responses
{
    public class OrderListDto
    {
        [JsonProperty("orderGuid")]
        public string OrderGuid { get; set; }
        [JsonProperty("restaurantLogo")]
        public string RestaurantLogo { get; set; }
        [JsonProperty("restaurantGuid")]
        public string RestaurantGuid { get; set; }
        [JsonProperty("restaurantName")]
        public string RestaurantName { get; set; }
        [JsonProperty("restaurantDescription")]
        public string RestaurantDescription { get; set; }
        [JsonProperty("orders")]
        public List<MenuDto> Orders { get; set; }
        [JsonProperty("status")]
        public int Status { get; set; }
        [JsonProperty("isCommeted")]
        public bool IsCommted { get; set; }
        [JsonProperty("date")]
        public DateTime Date { get; set; }
    }
}
