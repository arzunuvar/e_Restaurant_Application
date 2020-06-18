using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;
using System.Text;

namespace eRestaurant.Model.Enum
{
    public enum OrderStatus
    {
        [Description("Hazırlanıyor")]
        [EnumMember(Value = "0")]
        Waiting = 0,
        [Description("Sipariş yolda")]
        [EnumMember(Value = "1")]
        OnWay = 1,
        [Description("Teslim edildi")]
        [EnumMember(Value = "2")]
        Done = 2,
        [Description("İptal edildi")]
        [EnumMember(Value = "3")]
        Cancel = 3,
    }
}
