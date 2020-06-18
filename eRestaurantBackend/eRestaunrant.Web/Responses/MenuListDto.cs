using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Responses
{
    public class MenuListDto
    {
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("menuList")]
        public List<MenuDto> MenuList { get; set; }
    }
}
