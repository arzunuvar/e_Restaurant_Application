using eRestaunrant.Web.Requests;
using eRestaurant.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Interfaces
{
    public interface IAdvertisementService
    {
        void AddCarouselContent(AddCarouselContentRequest request);
        void UpdateCarouselIsActive(UpdateCarouselIsActiviteRequest request);
        void DeleteCarousel(CarouselDeleteRequest request);
        List<CarouselContent> GetCarouselContents(User currentUser);
    }
}
