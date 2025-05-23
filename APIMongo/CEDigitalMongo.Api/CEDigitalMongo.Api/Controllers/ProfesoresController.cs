using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using CEDigitalMongo.Api.Models;

namespace CEDigitalMongo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfesoresController : ControllerBase
    {
        private readonly IMongoCollection<Profesor> _profesores;

        public ProfesoresController(IMongoCollection<Profesor> profesores)
        {
            _profesores = profesores;
        }

        /// <summary>
        /// GET api/profesores
        /// Devuelve todos los profesores.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<Profesor>>> GetAll()
        {
            var lista = await _profesores.Find(_ => true).ToListAsync();
            return Ok(lista);
        }

        /// <summary>
        /// GET api/profesores/{id}
        /// Devuelve un profesor por su Id de MongoDB.
        /// </summary>
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Profesor>> GetById(string id)
        {
            var profesor = await _profesores.Find(x => x.Id == id).FirstOrDefaultAsync();
            if (profesor == null)
                return NotFound($"Profesor con Id='{id}' no encontrado.");
            return Ok(profesor);
        }

        /// <summary>
        /// POST api/profesores
        /// Crea un nuevo profesor. La contraseña en el cuerpo debe ser la clara;
        /// aquí se convierte a MD5 antes de guardar.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Profesor>> Create([FromBody] Profesor profesor)
        {
            // Validar payload mínimo
            if (string.IsNullOrWhiteSpace(profesor.Cedula) ||
                string.IsNullOrWhiteSpace(profesor.Nombre) ||
                string.IsNullOrWhiteSpace(profesor.Correo) ||
                string.IsNullOrWhiteSpace(profesor.PasswordMd5))
            {
                return BadRequest("Faltan campos obligatorios.");
            }

            // Convertir la contraseña clara a MD5
            profesor.PasswordMd5 = ComputeMd5(profesor.PasswordMd5);

            await _profesores.InsertOneAsync(profesor);
            return CreatedAtAction(nameof(GetById), new { id = profesor.Id }, profesor);
        }

        /// <summary>
        /// PUT api/profesores/{id}
        /// Actualiza un profesor existente. Si se envía PasswordMd5,
        /// se asume en texto claro y se convierte a MD5.
        /// </summary>
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, [FromBody] Profesor profesorIn)
        {
            var existente = await _profesores.Find(x => x.Id == id).FirstOrDefaultAsync();
            if (existente == null)
                return NotFound($"Profesor con Id='{id}' no encontrado.");

            // Si vienen campos nulos o vacíos, mantener el valor existente
            existente.Cedula = string.IsNullOrWhiteSpace(profesorIn.Cedula) ? existente.Cedula : profesorIn.Cedula;
            existente.Nombre = string.IsNullOrWhiteSpace(profesorIn.Nombre) ? existente.Nombre : profesorIn.Nombre;
            existente.Correo = string.IsNullOrWhiteSpace(profesorIn.Correo) ? existente.Correo : profesorIn.Correo;

            if (!string.IsNullOrWhiteSpace(profesorIn.PasswordMd5))
            {
                existente.PasswordMd5 = ComputeMd5(profesorIn.PasswordMd5);
            }

            await _profesores.ReplaceOneAsync(x => x.Id == id, existente);
            return NoContent();
        }

        /// <summary>
        /// DELETE api/profesores/{id}
        /// Elimina un profesor por su Id.
        /// </summary>
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var resultado = await _profesores.DeleteOneAsync(x => x.Id == id);
            if (resultado.DeletedCount == 0)
                return NotFound($"Profesor con Id='{id}' no encontrado.");
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
