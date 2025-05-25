// src/Components/Professor/StudentListReport.jsx
import React from 'react';
import { Card, Table } from 'react-bootstrap';

const StudentListReport = ({ course }) => {
  const students = [
    { name: 'Juan Pérez', email: 'juan.perez@example.com', id: '20201123' },
    { name: 'Ana López', email: 'ana.lopez@example.com', id: '20201045' },
    { name: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', id: '20201367' }
  ];

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>👥 Lista de Estudiantes - {course.name}</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr><th>Nombre</th><th>Email</th><th>ID</th></tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}><td>{s.name}</td><td>{s.email}</td><td>{s.id}</td></tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default StudentListReport;
