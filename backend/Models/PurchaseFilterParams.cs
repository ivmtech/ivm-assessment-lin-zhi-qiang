namespace Ivm.Assessment.Backend.Models;

/// <summary>
/// Filter parameters for purchase history queries
/// All parameters are optional (nullable)
/// </summary>
public class PurchaseFilterParams
{
    /// <summary>
    /// Search by product name (case-insensitive contains)
    /// Example: "Coke" matches "Coke", "Coca-Cola", etc.
    /// </summary>
    public string? SearchTerm { get; set; }

    /// <summary>
    /// Filter by specific machine ID
    /// Example: "machine-001"
    /// </summary>
    public string? MachineId { get; set; }

    /// <summary>
    /// Filter by date range (hours from now)
    /// Example: 24 = last 24 hours, 168 = last 7 days
    /// </summary>
    public int? Hours { get; set; }

    /// <summary>
    /// Sort field: "date", "amount", or "product"
    /// Default: "date"
    /// </summary>
    public string? SortField { get; set; }

    /// <summary>
    /// Sort order: "asc" or "desc"
    /// Default: "desc"
    /// </summary>
    public string? SortOrder { get; set; }
}
