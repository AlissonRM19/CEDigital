//ListaDocumentos.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditarDocumento from './EditarDocumento';
import SubirDocumento from './SubirDocumento'; // asegúrate de importarlo



function ListaDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [docEditar, setDocEditar] = useState(null);

  const cargarDocumentos = async () => {
    const res = await axios.get('http://localhost:3000/api/documentos');
    setDocumentos(res.data);
  };

  useEffect(() => {
    cargarDocumentos();
  }, []);

  const handleDocumentoSubido = () => {
    cargarDocumentos(); // refrescar lista al subir
  };

  const handleEditado = () => {
    setDocEditar(null);
    cargarDocumentos(); // Refrescar lista
  };

  //Eliminacion de documentos

  const eliminarDocumento = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/documentos/eliminar/${id}`);
    alert('📄 Documento eliminado con éxito');
    await cargarDocumentos(); // ✔️ Esta sí está definida arriba
  } catch (error) {
    console.error('❌ Error al eliminar documento:', error);
    alert('Hubo un problema al eliminar el documento');
  }
};


  /*const editarDocumento = async (id) => {
    const nuevoNombre = prompt('Nuevo nombre del archivo:');
    const nuevaCarpeta = prompt('Nueva carpeta:');
    if (!nuevoNombre || !nuevaCarpeta) return;

    await fetch(`http://localhost:3000/api/documentos/editar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nuevoNombre, carpeta: nuevaCarpeta })
    });

    alert('Documento editado con éxito');
    // Recargar la lista
    const res = await fetch('http://localhost:3000/api/documentos');
    const data = await res.json();
    setDocumentos(data);
  };*/

  return (
    <div>
      <h3>Documentos del profesor</h3>
      <SubirDocumento onSubido={handleDocumentoSubido} />
      <ul>
        {documentos.map((doc) => (
          <li key={doc._id}>
            <strong>{doc.nombre}</strong> - Carpeta: {doc.carpeta}
            <button onClick={() => setDocEditar(doc)}>✏️ Editar</button>
            <button onClick={() => eliminarDocumento(doc._id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>

    </div>
    
  );
}

export default ListaDocumentos;
