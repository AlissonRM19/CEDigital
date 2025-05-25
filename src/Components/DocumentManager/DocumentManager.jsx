// src/Components/DocumentManager/DocumentManager.jsx
import React, { useState } from 'react';
import { Card, Button, ListGroup, Form, Row, Col } from 'react-bootstrap';

const initialStructure = {
  "Presentaciones": ["intro.pdf", "tema1.pdf"],
  "Quices": ["quiz1.pdf"],
  "Exámenes": ["final.pdf"],
  "Proyectos": ["informe1.pdf"]
};

const DocumentManager = ({ user, course }) => {
  const [structure, setStructure] = useState(initialStructure);
  const [newFolder, setNewFolder] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFolderCreation = () => {
    if (newFolder && !structure[newFolder]) {
      setStructure(prev => ({ ...prev, [newFolder]: [] }));
      setNewFolder('');
    }
  };

  const handleDeleteFolder = (folder) => {
    const defaultFolders = ["Presentaciones", "Quices", "Exámenes", "Proyectos"];
    if (!defaultFolders.includes(folder)) {
      const newStructure = { ...structure };
      delete newStructure[folder];
      setStructure(newStructure);
    } else {
      alert("No se puede eliminar una carpeta predeterminada.");
    }
  };

  const handleFileUpload = () => {
    if (selectedFile && selectedFolder) {
      const newStructure = { ...structure };
      newStructure[selectedFolder].push(selectedFile.name);
      setStructure(newStructure);
      setSelectedFile(null);
    } else {
      alert("Debe seleccionar un archivo y una carpeta destino.");
    }
  };

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📁 Gestión de Documentos</h4>

      <Form className="mb-4">
        <Row className="align-items-end">
          <Col md={4}>
            <Form.Group controlId="newFolder">
              <Form.Label>Crear carpeta nueva:</Form.Label>
              <Form.Control
                type="text"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md="auto">
            <Button variant="light" onClick={handleFolderCreation} className="mt-2">Crear carpeta</Button>
          </Col>
        </Row>

        <Row className="mt-3 align-items-end">
          <Col md={4}>
            <Form.Group controlId="folderSelect">
              <Form.Label>Seleccionar carpeta para subir archivo:</Form.Label>
              <Form.Select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}>
                <option value=''>-- Selecciona una carpeta --</option>
                {Object.keys(structure).map(folder => (
                  <option key={folder} value={folder}>{folder}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="fileInput">
              <Form.Label>Seleccionar archivo:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </Form.Group>
          </Col>

          <Col md="auto">
            <Button variant="success" onClick={handleFileUpload} className="mt-2">Subir archivo</Button>
          </Col>
        </Row>
      </Form>

      {Object.entries(structure).map(([folder, files]) => (
        <div key={folder} className="mb-3">
          <h5 className="d-flex justify-content-between align-items-center">
            {folder}
            {!["Presentaciones", "Quices", "Exámenes", "Proyectos"].includes(folder) && (
              <Button variant="danger" size="sm" onClick={() => handleDeleteFolder(folder)}>Eliminar</Button>
            )}
          </h5>
          <ListGroup variant="flush">
            {files.map((file, i) => (
              <ListGroup.Item className="bg-secondary text-white d-flex justify-content-between" key={i}>
                {file}
                <Button variant="light" size="sm">Ver</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ))}
    </Card>
  );
};

export default DocumentManager;
