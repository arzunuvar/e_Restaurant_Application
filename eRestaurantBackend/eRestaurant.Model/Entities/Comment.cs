using System;
using System.Collections.Generic;
using System.Text;

namespace eRestaurant.Model.Entities
{
    public class Comment : BaseEntity
    {
        public string UserGuid { get; set; }
        public string RestaurantGuid { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
    }
}
