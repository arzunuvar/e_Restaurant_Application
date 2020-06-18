using AutoMapper;
using eRestaunrant.Web.Helpers;
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
    public class RestaurantService : IRestaurantService
    {

        private readonly IRepository<Restaurant> restaurantRepository;
        private readonly IRepository<Location> locationRepository;
        private readonly IRepository<Comment> commentRepository;
        private readonly IRepository<Order> orderRepository;
        private readonly IRepository<User> userRepository;
        private readonly IMapper mapper;
        public RestaurantService(
            IRepository<Restaurant> restaurantRepository, 
            IRepository<Location> locationRepository, 
            IRepository<Comment> commentRepository, 
            IRepository<User> userRepository,
            IRepository<Order> orderRepository,
            IMapper mapper)
        {
            this.restaurantRepository = restaurantRepository;
            this.locationRepository = locationRepository;
            this.commentRepository = commentRepository;
            this.userRepository = userRepository;
            this.orderRepository = orderRepository;
            this.mapper = mapper;
        }

        public List<RestaurantDto> GetRestaurantList(string search, User currentUser)
        {
            var user = userRepository.FindAll(x => x.Guid == currentUser.Guid).FirstOrDefault();

            var restaurantList = new List<Restaurant>();
            if (user.UserType == UserType.User)
            {
                var location = locationRepository.FindAll(x => x.OwnerGuid == currentUser.Guid && x.Type == LocationType.Person).FirstOrDefault();

                var restaurantLocations = locationRepository.FindAll(x => x.Type == LocationType.Restaurant);

                
                foreach (var restaurantLocation in restaurantLocations)
                {
                    if (DistanceCalculater.Calculate(location.Lattitude, location.Longitude, restaurantLocation.Lattitude, restaurantLocation.Longitude) < 1000)
                    {
                        var res = restaurantRepository.FindAll(x => x.Guid == restaurantLocation.OwnerGuid).FirstOrDefault();
                        restaurantList.Add(res);
                    }
                }
            }else
            {
                restaurantList = restaurantRepository.FindAll().ToList();
            }

            var restaurants = restaurantList.FindAll(x => x.Name.ToLower().Contains(search.ToLower())).ToList();

            var mappedList = mapper.Map<List<RestaurantDto>>(restaurants);

            foreach (var restaurant in mappedList)
            {
                restaurant.Rating = GetRestaurantRating(restaurant.Guid);
            }
            
            return mappedList;
        }

        public double GetRestaurantRating(string guid)
        {
            var comments = commentRepository.FindAll(x => x.RestaurantGuid == guid).ToList();

            double rating = (double)comments.Select(x => x.Rating).Sum() / comments.Count;

            return rating;
        }

        public void AddRestaurant(AddRestaurantRequest request)
        {
            var company = new Restaurant();
            if (!string.IsNullOrEmpty(request.Guid))
            {
                company = restaurantRepository.FindAll(x => x.Guid == request.Guid).FirstOrDefault();
            }
            else
            {
                company.Guid = Guid.NewGuid().ToString();
            }

            company.Name = request.Name;
            company.Description = request.Description;
            company.Logo = request.Logo;

            restaurantRepository.Add(company);

            var location = locationRepository.FindAll(x => x.OwnerGuid == company.Guid).FirstOrDefault();

            if (location == null)
            {
                location = new Location();
            }

            location.Address = request.Address;
            location.Lattitude = request.Lat;
            location.Longitude = request.Lng;
            location.OwnerGuid = company.Guid;
            location.Type = LocationType.Restaurant;

            locationRepository.Add(location);
        }

        public void DeleteRestaurant(GuidRequest request)
        {
            var location = locationRepository.FindAll(x => x.OwnerGuid == request.Guid).FirstOrDefault();

            locationRepository.Remove(location);

            var restaurant = restaurantRepository.FindAll(x => x.Guid == request.Guid).FirstOrDefault();
            restaurantRepository.Remove(restaurant);
        }

        public void SetComment(SetCommentRequest request, string currentUserGuid)
        {

            var orders = orderRepository.FindAll(x => x.OrderGuid == request.OrderGuid).ToList();

            foreach(var item in orders)
            {
                item.IsCommeted = true;
                orderRepository.Update(item);
            }

            var entity = mapper.Map<Comment>(request);
            entity.UserGuid = currentUserGuid;
            commentRepository.Add(entity);
        }

        public RestaurantCommentsDto GetComments(GuidRequest request)
        {
            var list = commentRepository.FindAll(x => x.RestaurantGuid == request.Guid).ToList();

            RestaurantCommentsDto rest = new RestaurantCommentsDto();
            rest.AveragePoint = list.Select(x => x.Rating).Sum() / list.Count;
            rest.Comments = new List<CommentDto>();
            foreach (var item in list)
            {
                var user = userRepository.FindAll(x => x.Guid == item.UserGuid).FirstOrDefault();
                rest.Comments.Add(new CommentDto
                {
                    Content = item.Content,
                    Whose = user.Name + " " + user.Surname,
                    Date = item.DateCreated,
                    Rating = item.Rating
                });
            }

            rest.Comments = rest.Comments.OrderByDescending(x => x.Date).ToList();
            return rest;
        }
    
    }
}
