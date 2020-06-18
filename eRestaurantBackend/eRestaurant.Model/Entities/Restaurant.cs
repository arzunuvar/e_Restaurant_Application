using System;
using System.Collections.Generic;
using System.Text;

namespace eRestaurant.Model.Entities
{
    public class Restaurant : BaseEntity
    {
        public string Guid { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Logo { get; set; }
    }
}
