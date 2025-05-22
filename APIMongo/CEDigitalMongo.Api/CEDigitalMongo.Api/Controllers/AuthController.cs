using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using CEDigitalMongo.Api.Models;

namespace CEDigitalMongo.Api.Controllers
{
    /// <summary>
    /// Controlador para validar el login de estudiantes y profesores contra MongoDB.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMongoCollection<Estudiante> _estudiantes;
        private readonly IMongoCollection<Profesor> _profesores;

        public AuthController(
            IMongoCollection<Estudiante> estudiantes,
            IMongoCollection<Profesor> profesores)
        {
            _estudiantes = estudiantes;
            _profesores = profesores;
        }

        /// <summary>
        /// POST api/auth/login/estudiantes
        /// Verifica la credencial de un estudiante (cédula + contraseña).
        /// </summary>
        [HttpPost("login/estudiantes")]
        public async Task<IActionResult> LoginEstudiante([FromBody] LoginRequest request)
        {
            // Hasheamos la contraseña clara con MD5
            var hash = ComputeMd5(request.Password);

            // Buscamos un documento que coincida en cédula y password
            var estudiante = await _estudiantes
                .Find(e => e.Cedula == request.Cedula && e.PasswordMd5 == hash)
                .FirstOrDefaultAsync();

            if (estudiante == null)
                return Unauthorized("Cédula o contraseña inválidos.");

            // Opcional: omitir la contraseña del payload de salida
            estudiante.PasswordMd5 = null!;
            return Ok(estudiante);
        }

        /// <summary>
        /// POST api/auth/login/profesores
        /// Verifica la credencial de un profesor (cédula + contraseña).
        /// </summary>
        [HttpPost("login/profesores")]
        public async Task<IActionResult> LoginProfesor([FromBody] LoginRequest request)
        {
            var hash = ComputeMd5(request.Password);

            var profesor = await _profesores
                .Find(p => p.Cedula == request.Cedula && p.PasswordMd5 == hash)
                .FirstOrDefaultAsync();

            if (profesor == null)
                return Unauthorized("Cédula o contraseña inválidos.");

            profesor.PasswordMd5 = null!;
            return Ok(profesor);
        }

        /// <summary>
        /// Genera el hash MD5 en minúsculas de la cadena de entrada.
        /// </summary>
        private static string ComputeMd5(string input)
        {
            using var md5 = MD5.Create();
            byte[] bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
            var sb = new StringBuilder();
            foreach (var b in bytes)
                sb.Append(b.ToString("x2"));
            return sb.ToString();
        }
    }

    /// <summary>
    /// DTO para peticiones de login.
    /// </summary>
    public class LoginRequest
    {
        /// <summary>
        /// Cédula en formato X-XXXX-XXXX.
        /// </summary>
        public string Cedula { get; set; } = null!;

        /// <summary>
        /// Contraseña en texto claro; se convertirá a MD5.
        /// </summary>
        public string Password { get; set; } = null!;
    }
}

