// src/Components/Professor/RubricManager.jsx
import React, { useState } from 'react';
import { Card, Form, Button, Table } from 'react-bootstrap';

const RubricManager = ({ course }) => {
  const [rubrics, setRubrics] = useState([]);
  const [newRubric, setNewRubric] = useState({ name: '', weight: '' });

  const handleAdd = () => {
    const weight = parseFloat(newRubric.weight);
    if (!newRubric.name || isNaN(weight)) return;
    const total = rubrics.reduce((sum, r) => sum + r.weight, 0) + weight;
    if (total > 100) return alert('La suma de los rubros no puede superar 100');
    setRubrics([...rubrics, { ...newRubric, weight }]);
    setNewRubric({ name: '', weight: '' });
  };

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📐 Gestión de Rubros - {course.name}</h4>
      <Form className="d-flex gap-2 mb-3">
        <Form.Control placeholder="Nombre del Rubro" value={newRubric.name}
          onChange={(e) => setNewRubric({ ...newRubric, name: e.target.value })} />
        <Form.Control type="number" placeholder="Peso (%)" value={newRubric.weight}
          onChange={(e) => setNewRubric({ ...newRubric, weight: e.target.value })} />
        <Button onClick={handleAdd}>Agregar</Button>
      </Form>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr><th>Nombre</th><th>Peso (%)</th></tr>
        </thead>
        <tbody>
          {rubrics.map((r, i) => (
            <tr key={i}><td>{r.name}</td><td>{r.weight}</td></tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default RubricManager;
