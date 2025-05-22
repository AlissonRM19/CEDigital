using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using CEDigitalMongo.Api.Models;

namespace CEDigitalMongo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstudiantesController : ControllerBase
    {
        private readonly IMongoCollection<Estudiante> _estudiantes;

        public EstudiantesController(IMongoCollection<Estudiante> estudiantes)
        {
            _estudiantes = estudiantes;
        }

        /// <summary>
        /// GET api/estudiantes
        /// Devuelve todos los estudiantes.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<Estudiante>>> GetAll()
        {
            var lista = await _estudiantes.Find(_ => true).ToListAsync();
            return Ok(lista);
        }

        /// <summary>
        /// GET api/estudiantes/{id}
        /// Devuelve un estudiante por su Id de MongoDB.
        /// </summary>
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Estudiante>> GetById(string id)
        {
            var estudiante = await _estudiantes.Find(x => x.Id == id).FirstOrDefaultAsync();
            if (estudiante == null)
                return NotFound($"Estudiante con Id='{id}' no encontrado.");
            return Ok(estudiante);
        }

        /// <summary>
        /// POST api/estudiantes
        /// Crea un nuevo estudiante. La contraseña en el cuerpo debe ser la clara;
        /// aquí se convierte a MD5 antes de guardar.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Estudiante>> Create([FromBody] Estudiante estudiante)
        {
            // Validar payload mínimo
            if (string.IsNullOrWhiteSpace(estudiante.Carnet) ||
                string.IsNullOrWhiteSpace(estudiante.Cedula) ||
                string.IsNullOrWhiteSpace(estudiante.Nombre) ||
                string.IsNullOrWhiteSpace(estudiante.Correo) ||
                string.IsNullOrWhiteSpace(estudiante.Telefono) ||
                string.IsNullOrWhiteSpace(estudiante.PasswordMd5))
            {
                return BadRequest("Faltan campos obligatorios.");
            }

            // Convertir la contraseña clara a MD5
            estudiante.PasswordMd5 = ComputeMd5(estudiante.PasswordMd5);

            await _estudiantes.InsertOneAsync(estudiante);
            return CreatedAtAction(nameof(GetById), new { id = estudiante.Id }, estudiante);
        }

        /// <summary>
        /// PUT api/estudiantes/{id}
        /// Actualiza un estudiante existente. Si se envía PasswordMd5,
        /// se asume en texto claro y se convierte a MD5.
        /// </summary>
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, [FromBody] Estudiante estudianteIn)
        {
            var existente = await _estudiantes.Find(x => x.Id == id).FirstOrDefaultAsync();
            if (existente == null)
                return NotFound($"Estudiante con Id='{id}' no encontrado.");

            // Si vienen campos nulos o vacíos, mantener el valor existente
            existente.Carnet = string.IsNullOrWhiteSpace(estudianteIn.Carnet) ? existente.Carnet : estudianteIn.Carnet;
            existente.Cedula = string.IsNullOrWhiteSpace(estudianteIn.Cedula) ? existente.Cedula : estudianteIn.Cedula;
            existente.Nombre = string.IsNullOrWhiteSpace(estudianteIn.Nombre) ? existente.Nombre : estudianteIn.Nombre;
            existente.Correo = string.IsNullOrWhiteSpace(estudianteIn.Correo) ? existente.Correo : estudianteIn.Correo;
            existente.Telefono = string.IsNullOrWhiteSpace(estudianteIn.Telefono) ? existente.Telefono : estudianteIn.Telefono;

            if (!string.IsNullOrWhiteSpace(estudianteIn.PasswordMd5))
            {
                existente.PasswordMd5 = ComputeMd5(estudianteIn.PasswordMd5);
            }

            await _estudiantes.ReplaceOneAsync(x => x.Id == id, existente);
            return NoContent();
        }

        /// <summary>
        /// DELETE api/estudiantes/{id}
        /// Elimina un estudiante por su Id.
        /// </summary>
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var resultado = await _estudiantes.DeleteOneAsync(x => x.Id == id);
            if (resultado.DeletedCount == 0)
                return NotFound($"Estudiante con Id='{id}' no encontrado.");
            return NoContent();
        }

        /// <summary>
        /// Genera el hash MD5 en minúsculas de la cadena de entrada.
        /// </summary>
        private static string ComputeMd5(string input)
        {
            using var md5 = MD5.Create();
            var bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
            var sb = new StringBuilder();
            foreach (var b in bytes)
                sb.Append(b.ToString("x2"));
            return sb.ToString();
        }
    }
}

