using API.Models;
using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Writers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderCreator _orderCreator;

        public OrderController(IOrderCreator orderCreator)
        {
            _orderCreator = orderCreator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(decimal price , [FromBody]CustomerModel customerModel)
        {
            await _orderCreator.CreateOrderAsync(price,customerModel);
            return Ok();
        }
    }
}
