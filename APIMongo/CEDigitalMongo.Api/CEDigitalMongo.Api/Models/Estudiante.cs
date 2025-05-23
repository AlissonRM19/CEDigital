using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CEDigitalMongo.Api.Models
{
    public class Estudiante
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("carnet")]
        public string Carnet { get; set; }

        [BsonElement("cedula")]
        public string Cedula { get; set; }

        [BsonElement("nombre")]
        public string Nombre { get; set; }

        [BsonElement("correo")]
        public string Correo { get; set; }

        [BsonElement("telefono")]
        public string Telefono { get; set; }

        /// <summary>
        /// Contraseña almacenada como hash MD5 en minúsculas.
        /// </summary>
        [BsonElement("password")]
        public string PasswordMd5 { get; set; }
    }
}
