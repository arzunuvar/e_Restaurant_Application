using System.ComponentModel;
using System.Runtime.Serialization;

namespace eRestaurant.Model.Enum
{
    public enum MenuType
    {
        [Description("Menüler")]
        [EnumMember(Value = "0")]
        Menus = 0,
        [Description("Çorbalar")]
        [EnumMember(Value = "1")]
        Soup = 1,
        [Description("Kebaplar & Izagarlar")]
        [EnumMember(Value = "2")]
        Kebab = 2,
        [Description("Lahmacunlar")]
        [EnumMember(Value = "3")]
        Lahmacun = 3,
        [Description("Pideler")]
        [EnumMember(Value = "4")]
        Pide = 4,
        [Description("Burgerler")]
        [EnumMember(Value = "5")]
        Burgers = 5,
        [Description("Kremitte Ürünler")]
        [EnumMember(Value = "6")]
        Kremitte = 6,
        [Description("Küçük Boy Pizza")]
        [EnumMember(Value = "7")]
        SmallPizza = 7,
        [Description("Orta Boy Pizza")]
        [EnumMember(Value = "8")]
        MidiumPizza = 8,
        [Description("Büyük Boy Pizza")]
        [EnumMember(Value = "9")]
        LargePizza = 9,
        [Description("Salatalar")]
        [EnumMember(Value = "10")]
        Salads = 10,
        [Description("Tatlılar")]
        [EnumMember(Value = "11")]
        Dessert = 11,
        [Description("İçecekler")]
        [EnumMember(Value = "12")]
        Drinks = 12
    }
}
