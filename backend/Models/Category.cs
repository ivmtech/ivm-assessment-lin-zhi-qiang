using System.ComponentModel.DataAnnotations;

namespace Ivm.Assessment.Backend.Models;
public class Category {
    public string Id { get; set; } = System.Guid.NewGuid().ToString();

    public string Name { get; set; } = "";
}
