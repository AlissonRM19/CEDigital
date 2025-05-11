import React, { useState } from 'react';
import axios from 'axios';

function LoginProfesor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/profesor/login', {
        email: email,
        password: password
      });
      console.log(res.data);
      alert('Login exitoso');
    } catch (error) {
      alert('Login fallido');
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
    </div>
  );
}

export default LoginProfesor;
