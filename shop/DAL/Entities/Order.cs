using DAL.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Order : BaseEntity
    {
       public int CustomerId { get; set; }
       public Customer Customer { get; set; }
       public DateTime OrderDate { get; set; }
       public OrderStatus OrderStatus { get; set; }
       public bool IsPaid { get; set; }
       public decimal TotalPrice {  get; set; }
       public ICollection<OrderItem> OrderItems { get; set; }
    }
}
