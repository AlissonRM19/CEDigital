// src/Components/Professor/EvaluationAssigner.jsx
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const EvaluationAssigner = ({ course }) => {
  const [form, setForm] = useState({
    rubric: '', weight: '', dueDate: '', group: false
  });

  const handleSubmit = () => {
    console.log('Evaluación asignada:', form);
    alert('Evaluación asignada (simulado)');
  };

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📝 Asignar Evaluaciones - {course.name}</h4>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Rubro</Form.Label>
          <Form.Control value={form.rubric} onChange={(e) => setForm({ ...form, rubric: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Peso (%)</Form.Label>
          <Form.Control type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Fecha de Entrega</Form.Label>
          <Form.Control type="datetime-local" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        </Form.Group>
        <Form.Check
          label="¿Es grupal?"
          checked={form.group}
          onChange={(e) => setForm({ ...form, group: e.target.checked })}
        />
        <Button className="mt-2" onClick={handleSubmit}>Asignar</Button>
      </Form>
    </Card>
  );
};

export default EvaluationAssigner;
