using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ivm.Assessment.Backend.Data;
using Ivm.Assessment.Backend.Models;

namespace Ivm.Assessment.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly VendingDbContext _db;

    public ProductsController(VendingDbContext db)
    {
        _db = db;
    }

    // GET: api/products
    // [TODO 1]: Return all products from database
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        // [TODO 1]: here
        var result = await _db.Products.ToListAsync();
        return Ok(result);
    }

    // POST: api/products/purchase
    // [TODO 2]: Implement purchase logic
    // 1.
    // 2. Calulate updated Stock accordingly
    // 3. Create Purchase record and save to database, return success response
    // 4. Api is expected to be throw error when:
    // a. missing request payload
    // b. out of stock + product not found (double check in api layer in addition to frontend)(500 and 404 accordingly with proper msg)
    // c. [BOUNS TODO 3]: call this api again within 5 seconds(To stimulate real machine behaviour)
    // NOTES: you can add functions/variable inside the controller class if need
    [HttpPost("purchase")]
    public async Task<ActionResult<PurchaseResponse>> Purchase([FromBody] PurchaseRequest? request)
    {
        Thread.Sleep(5000);
        // [TODO 2,3]: here
        // 1. Validate request payload
        if (request == null)
        {
            return BadRequest(new PurchaseResponse
            {
                Success = false,
                Message = "Request payload is required"
            });
        }

        if (String.IsNullOrEmpty(request.ProductID) || request.Quantity <= 0)
        {
            return BadRequest(new PurchaseResponse
            {
                Success = false,
                Message = "Valid ProductId and Quantity are required"
            });
        }

        try
        {
            var product = await _db.Products.FindAsync(request.ProductID);
            if (product == null)
            {
                return NotFound(new PurchaseResponse
                {
                    Success = false,
                    Message = $"Product with ID {request.ProductID} not found"
                });
            }

            // Check stock availability
            if (product.Stock < request.Quantity)
            {
                return StatusCode(500, new PurchaseResponse
                {
                    Success = false,
                    Message = $"Insufficient stock. Available: {product.Stock}, Requested: {request.Quantity}"
                });
            }

            // Calculate updated stock
            product.Stock -= request.Quantity;

            // 3. Create Purchase record
            var purchase = new Purchase
            {
                ProductId = request.ProductID,
                ProductName = product.Name,
                Quantity = request.Quantity,
                Amount = product.Price * request.Quantity
            };

            _db.Purchases.Add(purchase);
            await _db.SaveChangesAsync();

            // Return success response
            return Ok(new PurchaseResponse
            {
                Success = true,
                Message = "Purchase completed successfully",
                Remaining = product.Stock,
                QuantityPurchased = request.Quantity,
                TotalCost = purchase.Quantity * purchase.Amount
            });
        }
        catch (DbUpdateException ex)
        {
            // Handle database update errors
            return StatusCode(500, new PurchaseResponse
            {
                Success = false,
                Message = "Database error occurred while processing purchase"
            });
        }
        catch (Exception ex)
        {
            // Handle any other unexpected errors
            return StatusCode(500, new PurchaseResponse
            {
                Success = false,
                Message = "An unexpected error occurred"
            });
        }
    }

    // GET: api/products/purchases
    // [TODO 4]: Return all purchases from database
    // [BONUS TODO 5]: Support server side filtering with query parameters
    // Example: ?searchTerm=coke&machineId=machine-001&hours=24&sortField=amount&sortOrder=desc
    [HttpGet("purchases")]
    public async Task<ActionResult<IEnumerable<Purchase>>> GetPurchases([FromQuery] PurchaseFilterParams? filter)
    {
        // [TODO 4,5]: here
        throw new NotImplementedException();
    }


    // GET: api/products/balance
    [HttpGet("balance")]
    public ActionResult GetBalance()
    {
        Random random = new Random();
        double randomNumber = random.NextDouble() * 9 + 1;
        double roundedNumber = Math.Round(randomNumber, 2);
        return Ok(new { balance = roundedNumber });
    }
}

// public record PurchaseRequest(string ProductId);
