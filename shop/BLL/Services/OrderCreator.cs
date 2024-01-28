using API.Models;
using BLL.Interfaces;
using BLL.Models;
using DAL.Context;
using DAL.Entities;
using DAL.enums;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services
{
    public class OrderCreator : IOrderCreator
    {
        private readonly ApplicationContext _dbContext;

        public OrderCreator(ApplicationContext dbContext)
        {

            _dbContext = dbContext;
        }

        public async Task CreateOrderAsync(decimal totalPrice, CustomerModel customerModel)
        {
            var customer = new Customer
            {
                FirstName = customerModel.FirstName,
                LastName = customerModel.LastName,
                Email = customerModel.Email,
                PhoneNumber = customerModel.PhoneNumber,
                Address = customerModel.Address
            };

            var order = new Order
            {
                Customer = customer,
                TotalPrice = totalPrice,
                OrderDate = DateTime.Now,
                OrderStatus = OrderStatus.Processing,
                OrderItems = customerModel.productIds
                    .GroupBy(productId => productId)
                    .Select(group => new OrderItem
                    {
                        ProductId = group.Key, // Assuming productId is the ProductId in OrderItem
                        Quantity = group.Count()
                    })
                    .ToList()
            };
           
           await _dbContext.Orders.AddAsync(order);
           await _dbContext.SaveChangesAsync();
        }
    }
}
