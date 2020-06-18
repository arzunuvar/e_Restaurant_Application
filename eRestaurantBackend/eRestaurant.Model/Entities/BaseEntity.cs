using System;
using System.Collections.Generic;
using System.Text;

namespace eRestaurant.Model.Entities
{
    public class BaseEntity
    {
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
