using eRestaurant.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Extensions
{
    public static class ClaimsPrincipalExtension
    {
            /// <summary>
            /// Returns IAM User according to ClaimsPrincipal
            /// </summary>
            /// <param name="principal"></param>
            /// <returns></returns>
            public static User GetUser(this ClaimsPrincipal principal)
            {
                if (!principal.Identity.IsAuthenticated)
                {
                    return null;
                }

                var dict = principal.Claims.ToDictionary(t => t.Type, t => t.Value);

                var user = new User()
                {
                    Username = dict["Username"],
                    Guid = dict["Guid"],
                };

                return user;
            }
    }
}
