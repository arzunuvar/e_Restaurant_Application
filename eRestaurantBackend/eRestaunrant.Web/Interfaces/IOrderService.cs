using eRestaunrant.Web.Requests;
using eRestaunrant.Web.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Interfaces
{
    public interface IOrderService
    {
        void AddOrder(List<AddOrderRequest> request, string userGuid);
        void UpdateOrder(UpdateOrderRequest request);
        List<OrderListDto> GetOrdersByUser(GuidRequest request);
        List<OrderListDto> GetOrdersByRestaurant(GuidRequest request);
    }
}
