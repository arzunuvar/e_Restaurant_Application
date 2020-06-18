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
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order> orderRepository;
        private readonly IRepository<Restaurant> restaurantRepository;
        private readonly IRepository<Menu> menuRepository;

        public OrderService(IRepository<Order> orderRepository, IRepository<Restaurant> restaurantRepository, IRepository<Menu> menuRepository)
        {
            this.orderRepository = orderRepository;
            this.restaurantRepository = restaurantRepository;
            this.menuRepository = menuRepository;
        }


        public void AddOrder(List<AddOrderRequest> request, string userGuid)
        {
            var orderGuid = Guid.NewGuid().ToString();
            foreach (var item in request)
            {
                var order = new Order
                {
                    RestaurantGuid = item.RestaurantGuid,
                    OrderGuid = orderGuid,
                    Amount = item.Amount,
                    Count = item.Count,
                    MenuGuid = item.Guid,
                    UserGuid = userGuid
                };

                orderRepository.Add(order);
            }
        }

        public void UpdateOrder(UpdateOrderRequest request)
        {
            var orders = orderRepository.FindAll(x => x.OrderGuid == request.OrderGuid).ToList();

            foreach (var item in orders)
            {
                item.Status = (OrderStatus)request.Status;
                orderRepository.Add(item);
            }
        }

        public List<OrderListDto> GetOrdersByRestaurant(GuidRequest request)
        {
            var responseGroup = orderRepository.FindAll(x => x.RestaurantGuid == request.Guid).GroupBy(x => x.OrderGuid).ToList();

            var list = new List<OrderListDto>();
            foreach (var group in responseGroup)
            {
                var orderList = new OrderListDto();
                orderList.Orders = new List<MenuDto>();
                var restaurant = restaurantRepository.FindAll(x => x.Guid == group.FirstOrDefault().RestaurantGuid).FirstOrDefault();
                orderList.RestaurantGuid = restaurant.Guid;
                orderList.RestaurantName = restaurant.Name;
                orderList.RestaurantDescription = restaurant.Description;
                orderList.RestaurantLogo = restaurant.Logo;
                orderList.OrderGuid = group.FirstOrDefault().OrderGuid;
                orderList.Status = (int)group.FirstOrDefault().Status;
                orderList.Date = group.FirstOrDefault().DateCreated;

                foreach (var item in group)
                {
                    var menu = menuRepository.FindAll(x => x.Guid == item.MenuGuid).FirstOrDefault();
                    orderList.Orders.Add(new MenuDto
                    {
                        Guid = menu.Guid,
                        Name = menu.Name,
                        Description = menu.Description,
                        Logo = menu.Logo,
                        Amount = menu.Amount,
                        Count = menu.Count,
                        Type = (int)menu.Type,
                        RestaurantGuid = menu.RestaurantGuid
                    });
                }

                list.Add(orderList);
            }

            return list.OrderByDescending(x => x.Date).OrderBy(x=>x.Status).ToList();
        }

        public List<OrderListDto> GetOrdersByUser(GuidRequest request)
        {
            var responseGroup = orderRepository.FindAll(x => x.UserGuid == request.Guid).GroupBy(x => x.OrderGuid).ToList();

            var list = new List<OrderListDto>();
            foreach (var group in responseGroup)
            {
                var orderList = new OrderListDto();
                orderList.Orders = new List<MenuDto>();
                var restaurant = restaurantRepository.FindAll(x => x.Guid == group.FirstOrDefault().RestaurantGuid).FirstOrDefault();
                if (restaurant != null)
                {
                    orderList.RestaurantGuid = restaurant.Guid;
                    orderList.RestaurantName = restaurant.Name;
                    orderList.RestaurantDescription = restaurant.Description;
                    orderList.RestaurantLogo = restaurant.Logo;
                    orderList.OrderGuid = group.FirstOrDefault().OrderGuid;
                    orderList.Status = (int)group.FirstOrDefault().Status;
                    orderList.Date = group.FirstOrDefault().DateCreated;
                    orderList.IsCommted = group.FirstOrDefault().IsCommeted;
                    foreach (var item in group)
                    {
                        var menu = menuRepository.FindAll(x => x.Guid == item.MenuGuid).FirstOrDefault();
                        orderList.Orders.Add(new MenuDto
                        {
                            Guid = menu.Guid,
                            Name = menu.Name,
                            Description = menu.Description,
                            Logo = menu.Logo,
                            Amount = menu.Amount,
                            Count = menu.Count,
                            Type = (int)menu.Type,
                            RestaurantGuid = menu.RestaurantGuid
                        });
                    }

                    list.Add(orderList);
                }
            }

            return list.OrderByDescending(x => x.Date).Take(5).ToList(); 
        }

    }
}
