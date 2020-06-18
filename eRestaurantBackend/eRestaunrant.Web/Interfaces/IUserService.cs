using eRestaunrant.Web.Requests;
using eRestaurant.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        User CreateUser(RegistrationRequest request);
        string GenerateToken(User user);
        bool IsUserExist(string username);
        byte[] GetSalt();
        string HashPassword(string password, byte[] salt);
    }
}
