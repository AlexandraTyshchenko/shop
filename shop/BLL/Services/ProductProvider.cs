using BLL.Exceptions;
using BLL.Interfaces;
using BLL.Models;
using DAL.Context;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ProductProvider : IProductProvider
    {
      

        private readonly ApplicationContext _dbContext;

        public ProductProvider(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return  await _dbContext.Products.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            var product = await _dbContext.FindAsync<Product>(id);

            if (product == null)
            {
                throw new NotFoundException("product not found");
            }

            return product;
        }

        public async Task<TotalProducts> GetProductsByIds(int[] ids)
        {
            var selectedProducts = await _dbContext.Products
                .Where(p => ids.Contains(p.Id))
                .ToListAsync();

            var productCounts = ids
                .GroupBy(id => id)
                .Select(g => new ProductWithCount
                {
                    Id = g.Key,
                    Name = selectedProducts.FirstOrDefault(p => p.Id == g.Key)?.Name,
                    Description = selectedProducts.FirstOrDefault(p => p.Id == g.Key)?.Description,
                    Price = selectedProducts.FirstOrDefault(p => p.Id == g.Key).Price*g.Count(),
                    Img = selectedProducts.FirstOrDefault(p => p.Id == g.Key)?.Img,
                    Count = g.Count()
                });
            decimal totalPrice = productCounts.Select(x=>x.Price).Sum();
    
            return new TotalProducts() { Products = productCounts, Total = totalPrice }; 
        }



    }
}
