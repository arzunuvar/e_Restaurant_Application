using AutoMapper;
using eRestaunrant.Web.Interfaces;
using eRestaunrant.Web.Requests;
using eRestaunrant.Web.Responses;
using eRestaunrant.Web.ServiceProcessors;
using eRestaurant.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace eRestaunrant.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : AuthenticatedBaseController
    {

        private readonly IRestaurantService restaurantService;
        private readonly IServiceProcessor serviceProcessor;
        private readonly IMapper mapper;

        public RestaurantController(IRestaurantService restaurantService,IServiceProcessor serviceProcessor, IMapper mapper)
        {
            this.restaurantService = restaurantService;
            this.serviceProcessor = serviceProcessor;
            this.mapper = mapper;
        }

        [HttpGet("getrestaurantlist")]
        public IActionResult GetRestaurantList([FromQuery] string search)
        {
            if(search == null)
            {
                search = "";
            }

            var list = serviceProcessor.Call(restaurantService.GetRestaurantList,search,currentUser);
           

            return Json(list);
        }

        [HttpPost("addrestaurant")]
        public IActionResult AddRestaurant([FromBody] AddRestaurantRequest request)
        {
            if (string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Description))
            {
                throw new Exception("Lütfen alanları doldurunuz.");
            }

            var response = serviceProcessor.Call(restaurantService.AddRestaurant, request);
            return Json(response);
        }

        [HttpPost("deleteRestaurant")]
        public IActionResult DeleteRestaurant([FromBody] GuidRequest request)
        {
            var response = serviceProcessor.Call(restaurantService.DeleteRestaurant, request);
            return Json(response);
        }

        [HttpPost("setcomment")]
        public IActionResult SetComment([FromBody] SetCommentRequest request)
        {
            if(string.IsNullOrWhiteSpace(request.Content) || string.IsNullOrWhiteSpace(request.RestaurantGuid) || string.IsNullOrWhiteSpace(request.OrderGuid))
            {
                throw new Exception("Birşeyler yanlış gitti. Daha sonra tekrar deneyiniz.");
            }
            var response = serviceProcessor.Call(restaurantService.SetComment, request,currentUser.Guid);
            return Json(response);
        }

        [HttpPost("getcomments")]
        public IActionResult GetComments([FromBody] GuidRequest request)
        {
            var response = serviceProcessor.Call(restaurantService.GetComments, request);
            return Json(response);
        }

    }
}
