using AutoMapper;
using eRestaunrant.Web.Interfaces;
using eRestaunrant.Web.Requests;
using eRestaunrant.Web.Responses;
using eRestaunrant.Web.ServiceProcessors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : Controller
    {
        private readonly IMenuService menuService;
        private readonly IServiceProcessor serviceProcessor;
        private readonly IMapper mapper;

        public MenuController(IMenuService menuService, IServiceProcessor serviceProcessor, IMapper mapper)
        {
            this.menuService = menuService;
            this.serviceProcessor = serviceProcessor;
            this.mapper = mapper;
        }

        [HttpPost("getmenulist")]
        public IActionResult GetMenuList([FromBody] GuidRequest request)
        {
            if (string.IsNullOrEmpty(request.Guid))
            {
                throw new Exception("Restaurant Bulunamadı");
            }

            var serviceResponse = serviceProcessor.Call(menuService.GetAllMenuByGuid, request);

            if (!serviceResponse.Succeeded)
            {
                throw new Exception("Restaurant Listesi bulunamadı");
            }

            serviceResponse.Content = mapper.Map<List<MenuDto>>(serviceResponse.Content);

            return Json(serviceResponse);
        }


        [HttpPost("getmenus")]
        public IActionResult GetMenus([FromBody] GuidRequest request)
        {
            if (string.IsNullOrEmpty(request.Guid))
            {
                throw new Exception("Restaurant Bulunamadı");
            }

            var serviceResponse = serviceProcessor.Call(menuService.GetMenus, request);

            if (!serviceResponse.Succeeded)
            {
                throw new Exception("Restaurant Listesi bulunamadı");
            }

            return Json(serviceResponse);
        }


        [HttpPost("addmenu")]
        public IActionResult AddMenu([FromBody] AddMenuRequest request)
        {
            if (string.IsNullOrEmpty(request.Name) ||
                string.IsNullOrEmpty(request.Description) ||
                request.Amount <= 0)
            {
                throw new Exception("Lütfen alanları doldurunuz.");
            }

            var response = serviceProcessor.Call(menuService.AddMenu, request);

            return Json(response);
        }

        [HttpPost("deleteMenu")]
        public IActionResult DeleteMenu([FromBody] GuidRequest request)
        {
            var response = serviceProcessor.Call(menuService.DeleteMenu, request);
            return Json(response);
        }
    }
}
