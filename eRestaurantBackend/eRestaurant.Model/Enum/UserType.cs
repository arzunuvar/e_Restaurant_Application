using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;
using System.Text;

namespace eRestaurant.Model.Enum
{
    public enum UserType
    {
        [Description("user")]
        [EnumMember(Value = "0")]
        User = 0,
        [Description("admin")]
        [EnumMember(Value = "1")]
        Admin = 1
    }
}
