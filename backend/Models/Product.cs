namespace Ivm.Assessment.Backend.Models;
public class Product {
    public string Id { get; set; } = System.Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? CategoryId { get; set; }
}
