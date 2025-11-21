using Microsoft.EntityFrameworkCore;
using Ivm.Assessment.Backend.Models;

namespace Ivm.Assessment.Backend.Data;

public class VendingDbContext : DbContext
{
    public VendingDbContext(DbContextOptions<VendingDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Purchase> Purchases => Set<Purchase>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed initial data
        var drinksId = Guid.NewGuid().ToString();
        var snacksId = Guid.NewGuid().ToString();

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = drinksId, Name = "Drinks" },
            new Category { Id = snacksId, Name = "Snacks" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = Guid.NewGuid().ToString(), Name = "Coke", Price = 1.50m, Stock = 10, CategoryId = drinksId },
            new Product { Id = Guid.NewGuid().ToString(), Name = "Pepsi", Price = 1.50m, Stock = 2, CategoryId = drinksId },
            new Product { Id = Guid.NewGuid().ToString(), Name = "Water", Price = 1.00m, Stock = 15, CategoryId = drinksId },
            new Product { Id = Guid.NewGuid().ToString(), Name = "Chips", Price = 2.00m, Stock = 8, CategoryId = snacksId },
            new Product { Id = Guid.NewGuid().ToString(), Name = "Chocolate", Price = 2.50m, Stock = 1, CategoryId = snacksId },
            new Product { Id = Guid.NewGuid().ToString(), Name = "Cookies", Price = 1.75m, Stock = 12, CategoryId = snacksId }
        );
    }
}
