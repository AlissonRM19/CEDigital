import { useState } from 'react';
import axios from 'axios';

function EditarDocumento({ documento, onEditado }) {
  if (!documento) return null;

  const [nombre, setNombre] = useState(documento.nombre || '');
  const [carpeta, setCarpeta] = useState(documento.carpeta || '');
  console.log("Documento recibido para editar:", documento);


  const handleEditar = async () => {
    try {
      await axios.put(`http://localhost:3000/api/documentos/editar/${documento._id}`, {
        nombre,
        carpeta
      });
      alert('Documento editado correctamente');
      onEditado(); // para recargar lista si es necesario
    } catch (error) {
      alert('Error al editar documento');
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Editar Documento</h3>
      <input value={nombre} onChange={e => setNombre(e.target.value)} />
      <input value={carpeta} onChange={e => setCarpeta(e.target.value)} />
      <button onClick={handleEditar}>Guardar cambios</button>
    </div>
  );
}

export default EditarDocumento;
