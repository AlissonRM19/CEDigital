import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'profesor', // o 'estudiante'
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
      navigate('/'); // o la ruta que uses para el login
    } catch (error) {
      alert('Error al registrar: ' + error.response.data.mensaje);
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
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;
