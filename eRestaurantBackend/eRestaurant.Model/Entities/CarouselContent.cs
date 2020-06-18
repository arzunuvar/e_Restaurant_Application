using System;
using System.Collections.Generic;
using System.Text;

namespace eRestaurant.Model.Entities
{
    public class CarouselContent :BaseEntity
    {
        public string Source { get; set; }
        public string Caption { get; set; }
        public string Header { get; set; }
        public bool IsActive { get; set; }
    }
}
