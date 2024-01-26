using API.Models;
using AutoMapper;
using BLL.Interfaces;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductProvider _productProvider;
        private readonly IMapper _mapper;

        public ProductController(IProductProvider productProvider, IMapper mapper)
        {
            _productProvider = productProvider;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productProvider.GetAllProductsAsync();
            var result = _mapper.Map<IEnumerable<ProductModel>>(products);
            return Ok(result);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productProvider.GetProductByIdAsync(id);
            var result = _mapper.Map<ProductModel>(product);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> GetProductsByIds([FromBody] int[] ids)//post method to pass values from body
        {
            var products = await _productProvider.GetProductsByIds(ids);
            var result = _mapper.Map<IEnumerable<ProductModel>>(products);
            return Ok(result);
        }
    }
}
