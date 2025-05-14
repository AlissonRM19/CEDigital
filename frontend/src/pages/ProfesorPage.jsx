import React, { useState } from 'react';
import SubirDocumento from '../components/profesor/SubirDocumento';
import ListaDocumentos from '../components/profesor/ListaDocumentos';

function ProfesorPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Bienvenido, Profesor 👨‍🏫</h2>
      <ListaDocumentos />
    </div>
  );
}

export default ProfesorPage;
