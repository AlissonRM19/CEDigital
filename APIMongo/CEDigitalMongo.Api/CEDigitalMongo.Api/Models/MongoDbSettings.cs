namespace CEDigitalMongo.Api.Models
{
    /// <summary>
    /// Parámetros de configuración para MongoDB.
    /// </summary>
    public class MongoDbSettings
    {
        /// <summary>
        /// Cadena de conexión (URI) a MongoDB.
        /// </summary>
        public string ConnectionString { get; set; } = null!;

        /// <summary>
        /// Nombre de la base de datos a usar.
        /// </summary>
        public string CEDigital { get; set; } = null!;
    }
}
