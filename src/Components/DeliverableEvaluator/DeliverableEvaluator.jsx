import React, { useState } from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';

const mockSubmissions = [
  { id: 1, studentId: '20230001', student: 'Ana Torres', title: 'Tarea 1', file: 'tarea1_ana.pdf' },
  { id: 2, studentId: '20230002', student: 'Luis Gómez', title: 'Tarea 1', file: 'tarea1_luis.pdf' },
  { id: 3, studentId: '20230001', student: 'Ana Torres', title: 'Quiz 1', file: 'quiz1_ana.pdf' },
];

const DeliverableEvaluator = ({ course }) => {
  const [grades, setGrades] = useState({});
  const [feedback, setFeedback] = useState({});
  const [files, setFiles] = useState({});
  const [folderSelection, setFolderSelection] = useState({});
  const [published, setPublished] = useState(false);

  const folders = ['Feedback', 'Correcciones', 'Notas', 'Otros'];

  const handleGradeChange = (id, value) => {
    setGrades(prev => ({ ...prev, [id]: value }));
  };

  const handleFeedbackChange = (id, value) => {
    setFeedback(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (id, file) => {
    setFiles(prev => ({ ...prev, [id]: file }));
  };

  const handleFolderSelect = (id, value) => {
    setFolderSelection(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log('Guardado:', { grades, feedback, files, folderSelection });
    alert('Notas guardadas localmente.');
  };

  const handlePublish = () => {
    setPublished(true);
    console.log('Publicado:', { grades, feedback });
    alert('Notas publicadas para los estudiantes.');
  };

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📝 Evaluar Entregables</h4>
      <div className="table-responsive">
        <Table striped bordered hover variant="dark" className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Estudiante</th>
              <th>Carnet</th>
              <th>Entregable</th>
              <th>Archivo</th>
              <th>Nota</th>
              <th>Observaciones</th>
              <th>Archivo Feedback</th>
              <th>Carpeta</th>
            </tr>
          </thead>
          <tbody>
            {mockSubmissions.map(sub => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{sub.student}</td>
                <td>{sub.studentId}</td>
                <td>{sub.title}</td>
                <td>
                  <Button variant="light" size="sm">Descargar</Button>
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={grades[sub.id] || ''}
                    onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={feedback[sub.id] || ''}
                    onChange={(e) => handleFeedbackChange(sub.id, e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(sub.id, e.target.files[0])}
                  />
                </td>
                <td>
                  <Form.Select
                    value={folderSelection[sub.id] || ''}
                    onChange={(e) => handleFolderSelect(sub.id, e.target.value)}>
                    <option value="">Seleccionar carpeta</option>
                    {folders.map(folder => (
                      <option key={folder} value={folder}>{folder}</option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex gap-2">
        <Button onClick={handleSave} variant="warning">Guardar</Button>
        <Button onClick={handlePublish} variant="success">Publicar</Button>
      </div>
    </Card>
  );
};

export default DeliverableEvaluator;
