using eRestaurant.Model.Enum;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Responses
{
    public class UserDto
    {
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("surname")]
        public string Surname { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("id")]
        public string Guid { get; set; }

        [JsonProperty("type")]
        public UserType UserType { get; set; }

        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }

    }
}
