using API.Models;
using AutoMapper;
using DAL.Entities;

namespace API.Mapper
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Product, ProductModel>();
        }
    }
}
