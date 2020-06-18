using eRestaurant.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace eRestaurant.Model.Entities
{
    public class Menu : BaseEntity
    {
        public string Guid { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public int Count { get; set; } = 1;
        public decimal Amount { get; set; }
        public CurrencyType Currency { get; set; }
        public MenuType Type { get; set; }

        public string RestaurantGuid { get; set; }
    }
}
