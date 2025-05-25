import React, { useState } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

const mockStructure = {
  "Presentaciones": ["intro.pdf", "tema1.pdf"],
  "Quices": ["quiz1.pdf"],
  "Exámenes": ["final.pdf"],
  "Proyectos": ["informe1.pdf"]
};

const DocumentViewer = () => {
  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📁 Estructura de Documentos</h4>
      {Object.entries(mockStructure).map(([folder, files]) => (
        <div key={folder}>
          <h5>{folder}</h5>
          <ListGroup variant="flush">
            {files.map((file, i) => (
              <ListGroup.Item className="bg-secondary text-white d-flex justify-content-between" key={i}>
                {file}
                <Button variant="light" size="sm">Descargar</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ))}
    </Card>
  );
};

export default DocumentViewer;
