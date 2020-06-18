using eRestaunrant.Web.Extensions;
using eRestaunrant.Web.Interfaces;
using eRestaunrant.Web.Requests;
using eRestaunrant.Web.Responses;
using eRestaurant.Model.Entities;
using eRestaurant.Model.Enum;
using eRestaurant.Model.Respository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace eRestaunrant.Web.Services
{
    public class MenuService : IMenuService
    {
        private readonly IRepository<Menu> menuRepository;

        public MenuService(IRepository<Menu> menuRepository)
        {
            this.menuRepository = menuRepository;
        }

        public void AddMenu(AddMenuRequest request)
        {
            var entity = new Menu();
            if (!string.IsNullOrEmpty(request.Guid))
            {
                entity = menuRepository.FindAll(x => x.Guid == request.Guid).FirstOrDefault();
            }
            else
            {
                entity.Guid = Guid.NewGuid().ToString();
                entity.RestaurantGuid = request.RestaurantGuid;
            }

            entity.Logo = request.Logo;
            entity.Name = request.Name;
            entity.Description = request.Description;
            entity.Amount = request.Amount;
            entity.Type = (MenuType)request.Type;

            menuRepository.Add(entity);
        }


        public List<Menu> GetAllMenuByGuid(GuidRequest request)
        {
            var list = menuRepository.FindAll(x => x.RestaurantGuid == request.Guid).ToList();
            return list;
        }

        public void DeleteMenu(GuidRequest request)
        {
            var menu = menuRepository.FindAll(x => x.Guid == request.Guid).FirstOrDefault();
            menuRepository.Remove(menu);
        }

        public List<MenuListDto> GetMenus(GuidRequest guidRequest)
        {
            List<MenuListDto> menuTitleList = new List<MenuListDto>();
            var list = menuRepository
                .FindAll(x => x.RestaurantGuid == guidRequest.Guid)
                .OrderBy(x => x.Type)
                .GroupBy(x => x.Type);

            if(list == null)
            {
                throw new Exception("Menu bulunamadı");
            }

            list.ToList().ForEach(r => {
                MenuListDto menuList = new MenuListDto();
                menuList.MenuList = new List<MenuDto>();
                foreach (var v in r)
                {
                    menuList.Title = v.Type.GetDescription();
                    menuList.MenuList.Add(new MenuDto
                    {
                        Amount = v.Amount,
                        RestaurantGuid = v.RestaurantGuid,
                        Count = v.Count,
                        Description = v.Description,
                        Guid = v.Guid,
                        Logo = v.Logo,
                        Name = v.Name,
                        Type = (int)v.Type
                    });
                }
                menuTitleList.Add(menuList);
            });

            return menuTitleList;
        }
    }
}
