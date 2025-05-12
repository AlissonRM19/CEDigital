import React, { useState } from 'react';

function SubirDocumento() {
  const [archivo, setArchivo] = useState(null);
  const [carpeta, setCarpeta] = useState('');

  // TEMPORAL: simulamos un ID de usuario
  const usuario = { _id: '1234567890' }; // Aquí deberías obtenerlo desde el contexto o props

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo || !carpeta) {
      alert("Faltan datos");
      return;
    }

    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('carpeta', carpeta);
    formData.append('creadoPor', usuario._id);

    try {
      const res = await fetch('http://localhost:3000/api/documentos/subir', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        alert('Documento ha sido subido correctamente.');
      } else {
        alert('Ocurrió un error al subir el documento');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={e => setArchivo(e.target.files[0])} />
      <input type="text" placeholder="Nombre de carpeta" onChange={e => setCarpeta(e.target.value)} />
      <button type="submit">Subir</button>
    </form>
  );
}

export default SubirDocumento;
