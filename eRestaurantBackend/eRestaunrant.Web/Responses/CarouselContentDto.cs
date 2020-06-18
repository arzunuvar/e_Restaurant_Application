using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Responses
{
    public class CarouselContentDto
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("source")]
        public string Source { get; set; }
        [JsonProperty("caption")]
        public string Caption { get; set; }
        [JsonProperty("header")]
        public string Header { get; set; }
        [JsonProperty("isActive")]
        public bool IsActive { get; set; }
    }
}
