using eRestaurant.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace eRestaurant.Model.Entities
{
    public class Location : BaseEntity
    {
        public string Address { get; set; }
        public double Lattitude { get; set; }
        public double Longitude { get; set; }

        public string OwnerGuid { get; set; }
        public LocationType Type { get; set; }
    }
}
