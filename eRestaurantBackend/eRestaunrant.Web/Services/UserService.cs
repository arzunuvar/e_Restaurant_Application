using eRestaunrant.Web.Interfaces;
using eRestaunrant.Web.Requests;
using eRestaunrant.Web.Settings;
using eRestaurant.Model.Entities;
using eRestaurant.Model.Enum;
using eRestaurant.Model.Respository;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace eRestaunrant.Web.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> userRepository;
        private readonly IRepository<Location> locationRepository;
        private readonly AppSettings options;
        public UserService(IRepository<User> userRepository, IRepository<Location> locationRepository, IOptions<AppSettings> options)
        {
            this.userRepository = userRepository;
            this.locationRepository = locationRepository;
            this.options = options.Value;
        }

        public User Authenticate(string username, string password)
        {

            var user = userRepository.FindAll(x => x.Username == username).SingleOrDefault();
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var hashedPassword = HashPassword(password, Convert.FromBase64String(user.Salt));

            if (user.Password != hashedPassword)
            {
                throw new Exception("Wrong password");
            }

            user.AccessToken = GenerateToken(user);
            return user;
        }

        public string GenerateToken(User user)
        {
            var expire = DateTime.UtcNow.AddDays(7);
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Username",user.Username),
                new Claim("Guid", user.Guid),
                new Claim("Expire", expire.Ticks.ToString() ?? string.Empty)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(options.SigningKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims.ToArray()),
                Expires = expire,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        public User CreateUser(RegistrationRequest request)
        {
            if (IsUserExist(request.Username))
            {
                throw new Exception("Bu kullanıcı adı alınmıştır lütfen başka bir kullanıcı adı giriniz.");
            }

            var salt = GetSalt();
            var hashedPassword = HashPassword(request.Password, salt);

            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                Name = request.Name,
                Surname = request.Surname,
                PhoneNumber = request.PhoneNumber ?? "",
                Password = hashedPassword,
                Salt = Convert.ToBase64String(salt),
                Guid = Guid.NewGuid().ToString(),
            };

            userRepository.Add(user);

            var location = new Location
            {
                Address = request.Address,
                Lattitude = request.Lat,
                Longitude = request.Lng,
                OwnerGuid = user.Guid,
                Type = LocationType.Person
            };

            locationRepository.Add(location);

            return user;
        }

        public bool IsUserExist(string username)
        {
            return userRepository.FindAll().Any(x => x.Username == username);
        }

        public byte[] GetSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return salt;
        }

        public string HashPassword(string password, byte[] salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }

    }
}
