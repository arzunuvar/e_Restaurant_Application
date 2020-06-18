using eRestaurant.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace eRestaurant.Model.Entities
{
    public class Order : BaseEntity
    {
        public string OrderGuid { get; set; }
        public string UserGuid { get; set; }
        public string RestaurantGuid { get; set; }
        public string MenuGuid { get; set; }
        public int  Count { get; set; }
        public decimal Amount { get; set; }
        public OrderStatus Status { get; set; }
        public bool IsCommeted { get; set; }
    }
}
