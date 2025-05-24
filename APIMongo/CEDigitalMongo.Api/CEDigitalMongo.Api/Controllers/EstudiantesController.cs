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
    /// Controlador para gestionar CRUD de estudiantes usando el carné como identificador.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class EstudiantesController : ControllerBase
    {
        private readonly IMongoCollection<Estudiante> _estudiantes;

        /// <summary>
        /// Constructor que recibe la colección de Estudiante inyectada por DI.
        /// </summary>
        /// <param name="estudiantes">Colección de MongoDB de Estudiante.</param>
        public EstudiantesController(IMongoCollection<Estudiante> estudiantes)
        {
            _estudiantes = estudiantes;
        }

        /// <summary>
        /// GET /api/estudiantes
        /// Obtiene la lista completa de estudiantes.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<Estudiante>>> GetAll()
        {
            // Recupera todos los documentos de la colección
            var lista = await _estudiantes.Find(_ => true).ToListAsync();
            return Ok(lista);
        }

        /// <summary>
        /// GET /api/estudiantes/{carnet}
        /// Obtiene un estudiante por su carné.
        /// </summary>
        /// <param name="carnet">Carné del estudiante a buscar.</param>
        [HttpGet("{carnet}")]
        public async Task<ActionResult<Estudiante>> GetByCarnet(string carnet)
        {
            // Busca el estudiante cuyo campo Carnet coincida
            var estudiante = await _estudiantes
                .Find(e => e.Carnet == carnet)
                .FirstOrDefaultAsync();

            if (estudiante is null)
                return NotFound($"No existe estudiante con carné '{carnet}'.");

            return Ok(estudiante);
        }

        /// <summary>
        /// POST /api/estudiantes
        /// Crea un nuevo estudiante. Se espera el carné único en el cuerpo.
        /// </summary>
        /// <param name="estudiante">Objeto Estudiante con datos a insertar.</param>
        [HttpPost]
        public async Task<ActionResult<Estudiante>> Create([FromBody] Estudiante estudiante)
        {
            // Convertir la contraseña clara a MD5 antes de guardar
            estudiante.PasswordMd5 = ComputeMd5(estudiante.PasswordMd5);

            // Inserta el documento en la colección
            await _estudiantes.InsertOneAsync(estudiante);

            // Devuelve 201 Created y la ruta al recurso creado
            return CreatedAtAction(
                nameof(GetByCarnet),
                new { carnet = estudiante.Carnet },
                estudiante);
        }

        /// <summary>
        /// PUT /api/estudiantes/{carnet}
        /// Actualiza un estudiante existente. Mantiene valores no enviados.
        /// </summary>
        /// <param name="carnet">Carné del estudiante a actualizar.</param>
        /// <param name="dto">Objeto con los campos a modificar.</param>
        [HttpPut("{carnet}")]
        public async Task<IActionResult> Update(string carnet, [FromBody] Estudiante dto)
        {
            // Verifica si el estudiante existe
            var existente = await _estudiantes
                .Find(e => e.Carnet == carnet)
                .FirstOrDefaultAsync();

            if (existente is null)
                return NotFound($"No existe estudiante con carné '{carnet}'.");

            // Actualiza solo los campos proporcionados (si no vienen, conserva el valor anterior)
            existente.Nombre = dto.Nombre ?? existente.Nombre;
            existente.Cedula = dto.Cedula ?? existente.Cedula;
            existente.Correo = dto.Correo ?? existente.Correo;
            existente.Telefono = dto.Telefono ?? existente.Telefono;

            // Si se envía nueva contraseña, la convierte a MD5
            if (!string.IsNullOrWhiteSpace(dto.PasswordMd5))
            {
                existente.PasswordMd5 = ComputeMd5(dto.PasswordMd5);
            }

            // Reemplaza el documento completo en la colección
            await _estudiantes.ReplaceOneAsync(e => e.Carnet == carnet, existente);
            return NoContent();
        }

        /// <summary>
        /// DELETE /api/estudiantes/{carnet}
        /// Elimina un estudiante según su carné.
        /// </summary>
        /// <param name="carnet">Carné del estudiante a eliminar.</param>
        [HttpDelete("{carnet}")]
        public async Task<IActionResult> Delete(string carnet)
        {
            // Elimina el documento cuyo Carnet coincida
            var result = await _estudiantes.DeleteOneAsync(e => e.Carnet == carnet);

            if (result.DeletedCount == 0)
                return NotFound($"No existe estudiante con carné '{carnet}'.");

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

