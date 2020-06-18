using eRestaurant.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace eRestaurant.Model.Context
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CarouselContent> Carousels{ get; set; }

        public override int SaveChanges()
        {
            var entityObjects = ChangeTracker.Entries().Where(e => e.State == EntityState.Modified || e.State == EntityState.Added);
            foreach (var entityObject in entityObjects)
            {
                if ((entityObject.Entity as BaseEntity) != null)
                {
                    if ((entityObject.Entity as BaseEntity).Id > 0)
                    {
                        entityObject.State = EntityState.Modified;
                        (entityObject.Entity as BaseEntity).DateModified = DateTime.UtcNow;
                    }
                    else
                    {
                        (entityObject.Entity as BaseEntity).DateCreated = DateTime.UtcNow;
                    }
                }
            }
            return base.SaveChanges();
        }

    }
}
