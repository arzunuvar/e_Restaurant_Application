using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Requests
{
    public class GuidRequest
    {
        [JsonProperty("guid")]
        public string Guid { get; set; }
    }
}
