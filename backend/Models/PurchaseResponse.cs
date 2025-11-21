namespace Ivm.Assessment.Backend.Models;

public class PurchaseResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = "";
    public int Remaining { get; set; } // Remaining stock after purchase
    public int QuantityPurchased { get; set; } // Number of items purchased
    public decimal TotalCost { get; set; } // Total cost of purchase
    public string? Warning { get; set; } // Optional: for low stock warnings
}
