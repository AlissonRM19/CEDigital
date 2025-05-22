using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CEDigitalMongo.Api.Models
{
    /// <summary>
    /// Representa un profesor en la base de datos MongoDB.
    /// </summary>
    public class Profesor
    {
        /// <summary>
        /// Identificador interno generado por MongoDB.
        /// </summary>
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        /// <summary>
        /// Cédula de Costa Rica (formato X-XXXX-XXXX).
        /// </summary>
        [BsonElement("cedula")]
        public string Cedula { get; set; }

        /// <summary>
        /// Nombre completo del profesor.
        /// </summary>
        [BsonElement("nombre")]
        public string Nombre { get; set; }

        /// <summary>
        /// Correo electrónico del profesor.
        /// </summary>
        [BsonElement("correo")]
        public string Correo { get; set; }

        /// <summary>
        /// Contraseña almacenada como hash MD5 (32 caracteres hexadecimales en minúsculas).
        /// </summary>
        [BsonElement("password")]
        public string PasswordMd5 { get; set; }
    }
}

