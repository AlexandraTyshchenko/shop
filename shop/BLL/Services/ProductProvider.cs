using BLL.Exceptions;
using BLL.Interfaces;
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

        public async Task<IEnumerable<Product>> GetProductsByIds(int[] ids)
        {
            var selectedProducts = await  _dbContext.Products.Where(p => ids.Contains(p.Id)).ToListAsync();
            return selectedProducts;
        }
    }
}
