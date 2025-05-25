import React from 'react';
import { Card, Table } from 'react-bootstrap';

const GradeReportProfessor = ({ course }) => {
  const grades = [
    { student: 'Juan Pérez', rubric: 'Proyecto 1', grade: 85 },
    { student: 'Ana López', rubric: 'Proyecto 1', grade: 92 },
    { student: 'Carlos Ruiz', rubric: 'Tarea 1', grade: 78 }
  ];

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📊 Reporte de Notas - {course.name}</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr><th>Estudiante</th><th>Rubro</th><th>Nota</th></tr>
        </thead>
        <tbody>
          {grades.map((g, i) => (
            <tr key={i}><td>{g.student}</td><td>{g.rubric}</td><td>{g.grade}</td></tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default GradeReportProfessor;
