namespace Ivm.Assessment.Backend.Models;

public class Purchase
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string ProductId { get; set; } = "";
    public string ProductName { get; set; } = "";
    public int Quantity { get; set; } = 1; // Number of items purchased
    public decimal Amount { get; set; } // Total amount paid (price * quantity)
    public DateTime PurchaseTime { get; set; } = DateTime.UtcNow;
    public string MachineId { get; set; } = "";
}
