using Microsoft.EntityFrameworkCore;
using Ivm.Assessment.Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Vending Machine API",
        Version = "v1",
        Description = "Simple vending machine API for coding assessment"
    });
});

// Setup SQLite database
builder.Services.AddDbContext<VendingDbContext>(options =>
    options.UseSqlite("Data Source=vending.db"));

// Add CORS for local development
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Initialize database with seed data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<VendingDbContext>();
    DbInitializer.Initialize(db);
}

// Configure HTTP request pipeline
app.UseCors();

// Enable Swagger for all environments
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Vending Machine API v1");
    options.RoutePrefix = "swagger"; // Swagger UI at /swagger
});

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Run("http://localhost:5000");
