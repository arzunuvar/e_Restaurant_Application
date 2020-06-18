using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Responses
{
    public class CommentDto
    {
        [JsonProperty("content")]
        public string Content { get; set; }
        [JsonProperty("rating")]
        public int Rating { get; set; }
        [JsonProperty("whose")]
        public string Whose { get; set; }
        [JsonProperty("date")]
        public DateTime Date { get; set; }
    }
}
