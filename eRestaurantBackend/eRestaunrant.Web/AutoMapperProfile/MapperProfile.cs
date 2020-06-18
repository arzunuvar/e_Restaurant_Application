using AutoMapper;
using eRestaunrant.Web.Requests;
using eRestaunrant.Web.Responses;
using eRestaurant.Model.Entities;

namespace eRestaunrant.Web.AutoMapperProfile
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Restaurant, RestaurantDto>().ReverseMap();
            CreateMap<SetCommentRequest, Comment>().ReverseMap();
            CreateMap<CarouselContent, CarouselContentDto>().ReverseMap();
            CreateMap<MenuDto, Menu>().ReverseMap().ForMember(x => x.Type, opt => opt.MapFrom(y => (int)y.Type));
        }
    }
}
