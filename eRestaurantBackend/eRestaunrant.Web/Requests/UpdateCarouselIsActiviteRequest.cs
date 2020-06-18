using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Requests
{
    public class UpdateCarouselIsActiviteRequest
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("isActive")]
        public bool IsActive { get; set; }
    }
}
