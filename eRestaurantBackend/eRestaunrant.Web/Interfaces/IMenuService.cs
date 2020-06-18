
using eRestaunrant.Web.Requests;
using eRestaunrant.Web.Responses;
using eRestaurant.Model.Entities;
using System.Collections.Generic;

namespace eRestaunrant.Web.Interfaces
{
    public interface IMenuService
    {
        void AddMenu(AddMenuRequest request);
        List<Menu> GetAllMenuByGuid(GuidRequest request);
        void DeleteMenu(GuidRequest request);

        List<MenuListDto> GetMenus(GuidRequest guidRequest);
    }
}
