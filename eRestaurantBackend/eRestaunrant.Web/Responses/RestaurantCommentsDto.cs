using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Responses
{
    public class RestaurantCommentsDto
    {
        [JsonProperty("averagePoint")]
        public decimal AveragePoint { get; set; }
        [JsonProperty("comments")]
        public List<CommentDto> Comments  { get; set; }
    }
}
