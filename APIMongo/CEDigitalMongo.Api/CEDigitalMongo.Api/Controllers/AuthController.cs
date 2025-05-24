using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CEDigitalMongo.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;


namespace CEDigitalMongo.Api.Controllers
{
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
        /// Verifica las credenciales del estudiante por correo y contraseña.
        /// </summary>
        [HttpPost("login/estudiantes")]
        public async Task<IActionResult> LoginEstudiante([FromBody] LoginRequest request)
        {
            var hash = ComputeMd5(request.Password);

            var estudiante = await _estudiantes
                .Find(e => e.Correo == request.Correo && e.PasswordMd5 == hash)
                .FirstOrDefaultAsync();

            if (estudiante == null)
                return Unauthorized("Correo o contraseña inválidos.");

            estudiante.PasswordMd5 = null!;
            return Ok(estudiante);
        }

        /// <summary>
        /// POST api/auth/login/profesores
        /// Verifica las credenciales del profesor por correo y contraseña.
        /// </summary>
        [HttpPost("login/profesores")]
        public async Task<IActionResult> LoginProfesor([FromBody] LoginRequest request)
        {
            var hash = ComputeMd5(request.Password);

            var profesor = await _profesores
                .Find(p => p.Correo == request.Correo && p.PasswordMd5 == hash)
                .FirstOrDefaultAsync();

            if (profesor == null)
                return Unauthorized("Correo o contraseña inválidos.");

            profesor.PasswordMd5 = null!;
            return Ok(profesor);
        }

        /// <summary>
        /// Calcula el hash MD5 en minúsculas.
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

    /// <summary>
    /// Petición de login con correo y contraseña.
    /// </summary>
    public class LoginRequest
    {
        public string Correo { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}


