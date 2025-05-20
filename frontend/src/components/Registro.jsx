import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'profesor',
    carne: '',
    cedula: '',
    telefono: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/usuarios/registro', formData);
      alert('Registro exitoso 🎉');
      navigate('/');
    } catch (error) {
      alert('Error al registrar: ' + error.response?.data?.mensaje || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
      
      <select name="rol" onChange={handleChange}>
        <option value="profesor">Profesor</option>
        <option value="estudiante">Estudiante</option>
      </select>

      {/* Mostrar campos adicionales si es estudiante */}
      {formData.rol === 'estudiante' && (
        <>
          <input name="carne" placeholder="Carné" onChange={handleChange} required />
          <input name="cedula" placeholder="Cédula" onChange={handleChange} required />
          <input name="telefono" placeholder="Teléfono" onChange={handleChange} required />
        </>
      )}

      {/* Mostrar solo cédula si es profesor */}
      {formData.rol === 'profesor' && (
        <input name="cedula" placeholder="Cédula" onChange={handleChange} required />
      )}

      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;
