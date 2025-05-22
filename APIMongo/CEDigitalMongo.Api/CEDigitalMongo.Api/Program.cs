using CEDigitalMongo.Api.Data;
using CEDigitalMongo.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuración Mongo
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.AddSingleton<MongoDbContext>();

// 2. Colecciones
builder.Services.AddSingleton(serviceProvider =>
{
    var ctx = serviceProvider.GetRequiredService<MongoDbContext>();
    return ctx.GetCollection<Estudiante>("estudiantes");
});
builder.Services.AddSingleton(serviceProvider =>
{
    var ctx = serviceProvider.GetRequiredService<MongoDbContext>();
    return ctx.GetCollection<Profesor>("profesores");
});

// 3. Controladores + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 4. Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();

