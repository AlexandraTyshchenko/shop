using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
using System.Security.Cryptography.X509Certificates;

namespace DAL.EntityConfigurations
{
    internal class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Description);
            builder.Property(x => x.Img);

            builder.Property(p => p.Description).IsRequired();
            builder.Property(p => p.Price).IsRequired().HasColumnType("decimal(18,2)"); ;


            // Seed data
            builder.HasData(
                new Product { Id = 1, Name = "Product 1", Description = "Description 1", Img = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", Price = 10.99M },
                new Product { Id = 2, Name = "Product 2", Description = "Description 2", Img = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", Price = 19.99M },
                new Product { Id = 3, Name = "Product 3", Description = "Description 3", Img = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", Price = 25.99M },
                new Product { Id = 4, Name = "Product 4", Description = "Description 4", Img = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", Price = 14.99M },
                new Product { Id = 5, Name = "Product 5", Description = "Description 5", Img = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQPgYa4fNqmKd8VdtzELhQy6t3vBPnK-Sx_2XEPKmUvOr1BWt5gY7TyWYdUQAfM61pwuyD3Wnp_A82XrMmtBoNnG1mh=s2560", Price = 30.99M }
            );
        }
    }
}

