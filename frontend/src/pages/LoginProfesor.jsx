import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginProfesor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const irARegistro = () => {
    navigate('/registro');
  };
  

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/api/profesor/login', {
      email,
      password
    });

    const usuario = res.data.usuario;

    // ✅ Guardamos ID y nombre (o lo que necesites) en localStorage
    localStorage.setItem('profesorId', usuario._id);
    localStorage.setItem('nombreProfesor', usuario.nombre);

    console.log(res.data); // <-- Deberías ver el mensaje exitoso
    navigate('/profesor/dashboard');
  } catch (error) {
    console.error('Error al hacer login:', error);
    alert('Error al iniciar sesión');
  }
};

  


  return (
    <div>
      <h2>Login Profesor</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
      
      <button onClick={irARegistro}>
        ¿No tienes cuenta? Regístrate aquí
      </button>

    </div>
  );
}

export default LoginProfesor;

