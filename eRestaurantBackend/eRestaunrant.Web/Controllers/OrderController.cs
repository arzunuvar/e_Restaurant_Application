using eRestaunrant.Web.Interfaces;
using eRestaunrant.Web.Requests;
using eRestaunrant.Web.ServiceProcessors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace eRestaunrant.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : AuthenticatedBaseController
    {
        private readonly IOrderService orderService;
        private readonly IServiceProcessor serviceProcessor;
        public OrderController(IOrderService orderService, IServiceProcessor serviceProcessor)
        {
            this.orderService = orderService;
            this.serviceProcessor = serviceProcessor;
        }

        [HttpPost("addorder")]
        public IActionResult AddOrder([FromBody] List<AddOrderRequest> request)
        {
            if (request.Count == 0) {
                throw new Exception("Sipariş bulunamadı.");
            }

            var response = serviceProcessor.Call(orderService.AddOrder, request,currentUser.Guid);

            return Json(response);
        }

        [HttpPost("updateorder")]
        public IActionResult UpdateOrder([FromBody] UpdateOrderRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.OrderGuid))
            {
                throw new Exception("Sipariş bulunamadı.");
            }

            var response = serviceProcessor.Call(orderService.UpdateOrder, request);

            return Json(response);
        }

        [HttpPost("getordersbyuser")]
        public IActionResult GetOrdersByUser(GuidRequest request)
        {
            if (string.IsNullOrEmpty(request.Guid))
            {
                throw new Exception("Kullanıcı bulunamadı");
            }

            var response = serviceProcessor.Call(orderService.GetOrdersByUser,request);

            return Json(response);
        }

        [HttpPost("getordersbyrestaurant")]
        public IActionResult GetOrdersByRestaurant(GuidRequest request)
        {
            if (string.IsNullOrEmpty(request.Guid))
            {
                throw new Exception("Kullanıcı bulunamadı");
            }

            var response = serviceProcessor.Call(orderService.GetOrdersByRestaurant, request);

            return Json(response);
        }
    }
}
