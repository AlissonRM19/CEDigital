using MongoDB.Driver;
using Microsoft.Extensions.Options;
using CEDigitalMongo.Api.Models;

namespace CEDigitalMongo.Api.Data
{
    /// <summary>
    /// Proporciona acceso al cliente y la base de datos de MongoDB.
    /// </summary>
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        /// <summary>
        /// Constructor: crea el cliente e inicializa la BD.
        /// </summary>
        public MongoDbContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        /// <summary>
        /// Obtiene la colección genérica TDocument.
        /// </summary>
        public IMongoCollection<TDocument> GetCollection<TDocument>(string name)
        {
            return _database.GetCollection<TDocument>(name);
        }
    }
}

