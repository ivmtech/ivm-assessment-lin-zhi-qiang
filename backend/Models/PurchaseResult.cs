namespace Ivm.Assessment.Backend.Models;
public class PurchaseResult {
    public string MachineId { get; set; } = "";
    public bool Success { get; set; }
    public string Timestamp { get; set; } = System.DateTime.UtcNow.ToString("o");
    public int Remaining { get; set; }

}
