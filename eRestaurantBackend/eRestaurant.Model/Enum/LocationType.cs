using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;
using System.Text;

namespace eRestaurant.Model.Enum
{
    public enum LocationType
    {
        [Description("Person")]
        [EnumMember(Value = "0")]
        Person = 0,
        [Description("Restaurant")]
        [EnumMember(Value = "1")]
        Restaurant = 1,
    }
}
