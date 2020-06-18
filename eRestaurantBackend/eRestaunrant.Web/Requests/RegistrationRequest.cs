using Newtonsoft.Json;

namespace eRestaunrant.Web.Requests
{
    public class RegistrationRequest
    {
        [JsonRequired]
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonRequired]
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonRequired]
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonRequired]
        [JsonProperty("surname")]
        public string Surname { get; set; }
        [JsonRequired]
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("phoneNumber")]
        public string PhoneNumber { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }
        [JsonProperty("lat")]
        public double Lat { get; set; }
        [JsonProperty("lng")]
        public double Lng { get; set; }
    }
}
