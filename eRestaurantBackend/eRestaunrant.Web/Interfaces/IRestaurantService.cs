using eRestaunrant.Web.Requests;
using eRestaunrant.Web.Responses;
using eRestaurant.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Interfaces
{
    public interface IRestaurantService
    {
        List<RestaurantDto> GetRestaurantList(string search, User currentUser);
        void AddRestaurant(AddRestaurantRequest request);
        void DeleteRestaurant(GuidRequest request);

        void SetComment(SetCommentRequest request,string currentUserGuid);
        RestaurantCommentsDto GetComments(GuidRequest request);
        double GetRestaurantRating(string guid);
    }
}
