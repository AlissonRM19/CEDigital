import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfesorPage = () => {
  const [documentos, setDocumentos] = useState([]);
  const profesorId = localStorage.getItem('profesorId');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profesorId');
    localStorage.removeItem('nombreProfesor');
    // Puedes borrar más cosas si guardas más datos
    navigate('/'); // Redirige al login
  };
  useEffect(() => {
    const id = localStorage.getItem('profesorId');
    if (!id) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const cargarDocumentos = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/documentos/profesor/${profesorId}`);
        setDocumentos(res.data);
      } catch (error) {
        console.error('Error al cargar documentos:', error);
      }
    };

    if (profesorId) {
      cargarDocumentos();
    }
  }, [profesorId]);

  return (
    <div>
      <h2>Bienvenido, {localStorage.getItem('nombreProfesor')}</h2>
      <ul>
        {documentos.map(doc => (
          <li key={doc._id}>{doc.nombre}</li>
        ))}
        <button onClick={handleLogout}>Cerrar sesión</button>
      </ul>
    </div>
  );
};

export default ProfesorPage;
