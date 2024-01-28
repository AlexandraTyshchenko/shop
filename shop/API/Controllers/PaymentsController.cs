using BLL.Models;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : Controller
    {
        public PaymentsController()
        {
            StripeConfiguration.ApiKey = "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
        }

        [HttpPost("create-checkout-session")]
        public ActionResult CreateCheckoutSession(decimal total, [FromBody] IEnumerable<ProductWithCount> Products )
        {
            // Assuming TotalProducts has the structure you provided with Products and Total properties
            // Use the data from totalProducts to create the Stripe session
            var options = new SessionCreateOptions
            {
                LineItems = Products.Select(product =>
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = (long)(product.Price * 100), // Convert decimal to cents (Stripe uses cents)
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = product.Name,
                                // Other product details
                            },
                        },
                        Quantity = product.Count,
                    }
                ).ToList(),
                Mode = "payment",
                SuccessUrl = "http://localhost:4200/success",
                CancelUrl = "http://localhost:4200/cancel",
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return Ok(new { session = session.Url });
        }

    }
}
