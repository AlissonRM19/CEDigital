using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CEDigitalMongo.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;


namespace CEDigitalMongo.Api.Controllers
{
    /// <summary>
    /// Controlador para gestionar CRUD de profesores usando la cédula como identificador.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ProfesoresController : ControllerBase
    {
        private readonly IMongoCollection<Profesor> _profesores;

        /// <summary>
        /// Constructor que recibe la colección de Profesor inyectada por DI.
        /// </summary>
        /// <param name="profesores">Colección de MongoDB de Profesor.</param>
        public ProfesoresController(IMongoCollection<Profesor> profesores)
        {
            _profesores = profesores;
        }

        /// <summary>
        /// GET /api/profesores
        /// Obtiene la lista completa de profesores.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<Profesor>>> GetAll()
        {
            // Recupera todos los documentos de la colección
            var lista = await _profesores.Find(_ => true).ToListAsync();
            return Ok(lista);
        }

        /// <summary>
        /// GET /api/profesores/{cedula}
        /// Obtiene un profesor por su cédula.
        /// </summary>
        /// <param name="cedula">Cédula del profesor a buscar (formato X-XXXX-XXXX).</param>
        [HttpGet("{cedula}")]
        public async Task<ActionResult<Profesor>> GetByCedula(string cedula)
        {
            // Busca el profesor cuyo campo Cedula coincida
            var profesor = await _profesores
                .Find(p => p.Cedula == cedula)
                .FirstOrDefaultAsync();

            if (profesor is null)
                return NotFound($"No existe profesor con cédula '{cedula}'.");

            // Ocultamos la contraseña en la respuesta
            profesor.PasswordMd5 = null!;
            return Ok(profesor);
        }

        /// <summary>
        /// POST /api/profesores
        /// Crea un nuevo profesor. Se espera la cédula única en el cuerpo.
        /// </summary>
        /// <param name="profesor">Objeto Profesor con datos a insertar.</param>
        [HttpPost]
        public async Task<ActionResult<Profesor>> Create([FromBody] Profesor profesor)
        {
            // Convertir la contraseña clara a MD5 antes de guardar
            profesor.PasswordMd5 = ComputeMd5(profesor.PasswordMd5);

            // Inserta el documento en la colección
            await _profesores.InsertOneAsync(profesor);

            // Ocultamos la contraseña en la respuesta
            profesor.PasswordMd5 = null!;

            // Devuelve 201 Created y la ruta al recurso creado
            return CreatedAtAction(
                nameof(GetByCedula),
                new { cedula = profesor.Cedula },
                profesor);
        }

        /// <summary>
        /// PUT /api/profesores/{cedula}
        /// Actualiza un profesor existente. Mantiene valores no enviados.
        /// </summary>
        /// <param name="cedula">Cédula del profesor a actualizar.</param>
        /// <param name="dto">Objeto con los campos a modificar.</param>
        [HttpPut("{cedula}")]
        public async Task<IActionResult> Update(string cedula, [FromBody] Profesor dto)
        {
            // Verifica si el profesor existe
            var existente = await _profesores
                .Find(p => p.Cedula == cedula)
                .FirstOrDefaultAsync();

            if (existente is null)
                return NotFound($"No existe profesor con cédula '{cedula}'.");

            // Actualiza solo los campos proporcionados (si no vienen, conserva el valor anterior)
            existente.Nombre = dto.Nombre ?? existente.Nombre;
            existente.Correo = dto.Correo ?? existente.Correo;

            // Si se envía nueva contraseña, la convierte a MD5
            if (!string.IsNullOrWhiteSpace(dto.PasswordMd5))
            {
                existente.PasswordMd5 = ComputeMd5(dto.PasswordMd5);
            }

            // Reemplaza el documento completo en la colección
            await _profesores.ReplaceOneAsync(p => p.Cedula == cedula, existente);
            return NoContent();
        }

        /// <summary>
        /// DELETE /api/profesores/{cedula}
        /// Elimina un profesor según su cédula.
        /// </summary>
        /// <param name="cedula">Cédula del profesor a eliminar.</param>
        [HttpDelete("{cedula}")]
        public async Task<IActionResult> Delete(string cedula)
        {
            // Elimina el documento cuyo Cedula coincida
            var result = await _profesores.DeleteOneAsync(p => p.Cedula == cedula);

            if (result.DeletedCount == 0)
                return NotFound($"No existe profesor con cédula '{cedula}'.");

            return NoContent();
        }

        /// <summary>
        /// Genera el hash MD5 en minúsculas de la cadena de entrada.
        /// </summary>
        /// <param name="input">Texto claro a hashear.</param>
        /// <returns>Hash MD5 en minúsculas (32 caracteres).</returns>
        private static string ComputeMd5(string input)
        {
            using var md5 = MD5.Create();
            byte[] bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
            var sb = new StringBuilder();
            foreach (var b in bytes)
            {
                sb.Append(b.ToString("x2"));
            }
            return sb.ToString();
        }
    }
}

