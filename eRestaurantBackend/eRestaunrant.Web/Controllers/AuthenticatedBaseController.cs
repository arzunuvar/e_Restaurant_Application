using eRestaunrant.Web.Extensions;
using eRestaurant.Model.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace eRestaunrant.Web.Controllers
{
    public class AuthenticatedBaseController : Controller
    {
        /// <summary>
        /// Get current user from claims principal
        /// </summary>
        public User currentUser
        {
            get
            {
                var user = HttpContext.User.GetUser();

                if (user != null && !string.IsNullOrEmpty(user.Guid))
                {
                    return user;
                }

                throw new Exception("User not found");
            }
        }

    }
}