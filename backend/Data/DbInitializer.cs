using Microsoft.EntityFrameworkCore;

namespace Ivm.Assessment.Backend.Data;

public static class DbInitializer
{
    public static void Initialize(VendingDbContext context)
    {

        context.Database.EnsureCreated();
    }
}
