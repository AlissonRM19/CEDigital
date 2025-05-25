import React, { useState } from 'react';
import { Card, Table, Button, Form, Alert } from 'react-bootstrap';

const mockEvaluations = [
  { id: 1, name: "Proyecto 1", groupSubmitted: false, file: null },
  { id: 2, name: "Examen Final", groupSubmitted: true, file: "examen-final-entregado.pdf" }
];

const EvaluationUploader = ({ user }) => {
  const [evaluations, setEvaluations] = useState(mockEvaluations);
  const [alert, setAlert] = useState('');

  const handleUpload = (id, file) => {
    setEvaluations(evaluations.map(e => e.id === id ? { ...e, file, groupSubmitted: true } : e));
    setAlert(`Entregable subido correctamente: ${file.name}`);
    setTimeout(() => setAlert(''), 3000);
  };

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📤 Enviar Evaluaciones</h4>
      {alert && <Alert variant="success">{alert}</Alert>}
      <Table variant="dark" striped>
        <thead>
          <tr><th>Evaluación</th><th>Estado</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {evaluations.map(ev => (
            <tr key={ev.id}>
              <td>{ev.name}</td>
              <td>{ev.groupSubmitted ? "✅ Ya enviada" : "❌ Pendiente"}</td>
              <td>
                {ev.groupSubmitted ? (
                  <Button size="sm" variant="light">Descargar Entrega</Button>
                ) : (
                  <Form.Control
                    type="file"
                    onChange={e => handleUpload(ev.id, e.target.files[0])}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default EvaluationUploader;
