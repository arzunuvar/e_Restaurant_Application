using System;
using System.Text;
using AutoMapper;
using eRestaunrant.Web.Interfaces;
using eRestaunrant.Web.ServiceProcessors;
using eRestaunrant.Web.Services;
using eRestaunrant.Web.Settings;
using eRestaurant.Model.Context;
using eRestaurant.Model.Respository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace eRestaunrant.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true);

            Configuration = builder.Build();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.AddSingleton(cfg => cfg.GetService<IOptions<AppSettings>>().Value);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //db connection
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SqlConnection")));

            //Dependency Injection
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IMediaService, MediaService>();
            services.AddScoped<IRestaurantService, RestaurantService>();
            services.AddScoped<IMenuService, MenuService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IAdvertisementService, AdvertisementService>();
            services.AddScoped<IServiceProcessor, ServiceProcessor>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            var settings = Configuration.GetSection(nameof(AppSettings)).Get<AppSettings>();

            services.AddAutoMapper();

            services.AddMvc(opt =>
            {
                opt.Filters.Add(new AuthorizeFilter());
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
           .AddJsonOptions(options =>
           {
               options.SerializerSettings.DateFormatString = "dd/MM/yy hh:mm tt";
           });

            var key = Encoding.ASCII.GetBytes(settings.SigningKey);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
          .AddJwtBearer(x =>
          {
              x.RequireHttpsMetadata = false;
              x.SaveToken = true;
              x.TokenValidationParameters = new TokenValidationParameters
              {
                  ValidateIssuerSigningKey = true,
                  IssuerSigningKey = new SymmetricSecurityKey(key),
                  ValidateIssuer = false,
                  ValidateAudience = false
              };
          });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
            }

            app.UseCors(opt =>
               opt.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               );
            app.UseCors("AllowSpecificOrigins");
            app.Use((context, next) =>
            {
                context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                context.Response.Headers["Access-Control-Allow-Headers"] = "origin, x-requested-with, content-type";
                context.Response.Headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,DELETE,PUT";
                return next.Invoke();

            });
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
