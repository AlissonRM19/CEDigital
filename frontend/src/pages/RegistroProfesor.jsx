import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistroProfesor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'profesor', // o 'estudiante'
  });
  

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/profesor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        alert('Registro exitoso');
        navigate('/login'); // redirige al login
      } else {
        const error = await res.json();
        alert(error.mensaje);
      }
    } catch (err) {
      console.error('Error al registrar:', err);
    }
  };

  return (
    <form onSubmit={handleRegistro}>
      <h2>Registro de Profesor</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroProfesor;
