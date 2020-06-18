using eRestaunrant.Web.Interfaces;
using eRestaunrant.Web.Requests;
using eRestaurant.Model.Entities;
using eRestaurant.Model.Enum;
using eRestaurant.Model.Respository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Services
{
    public class AdvertisementService : IAdvertisementService
    {
        private readonly IRepository<CarouselContent> carouselContentRepository;
        private readonly IRepository<User> userRepository;
        public AdvertisementService(IRepository<CarouselContent> carouselContentRepository, IRepository<User> userRepository)
        {
            this.carouselContentRepository = carouselContentRepository;
            this.userRepository = userRepository;
        }

        public void AddCarouselContent(AddCarouselContentRequest request)
        {
            var entity = new CarouselContent
            {
                Caption = request.Caption,
                Header = request.Header,
                Source = request.Source,
                IsActive = request.IsActive
            };

            carouselContentRepository.Add(entity);
        }

        public void DeleteCarousel(CarouselDeleteRequest request)
        {
            carouselContentRepository.Remove(request.Id);
        }

        public void UpdateCarouselIsActive(UpdateCarouselIsActiviteRequest request)
        {
            var entity = carouselContentRepository.FindById(request.Id);
            entity.IsActive = !entity.IsActive;

            carouselContentRepository.Update(entity);
        }

        public List<CarouselContent> GetCarouselContents(User currentUser)
        {

            var user = userRepository.FindAll(x => x.Guid == currentUser.Guid).FirstOrDefault();

            if (user.UserType == UserType.User)
            {  
                return carouselContentRepository.FindAll(x => x.IsActive).Take(5).ToList();
            }

            return carouselContentRepository.FindAll().ToList();

        }
    }
}
