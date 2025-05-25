import React from 'react';
import { Table, Button } from 'react-bootstrap';

const CourseManagement = () => {
  // Simulación de cursos (esto vendría de la API)
  const cursos = [
    { codigo: 'INF101', nombre: 'Intro a la Programación', creditos: 4, carrera: 'Ingeniería' },
    { codigo: 'MAT202', nombre: 'Álgebra Lineal', creditos: 3, carrera: 'Matemáticas' },
  ];

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Créditos</th>
          <th>Carrera</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {cursos.map((curso, index) => (
          <tr key={index}>
            <td>{curso.codigo}</td>
            <td>{curso.nombre}</td>
            <td>{curso.creditos}</td>
            <td>{curso.carrera}</td>
            <td>
              <Button variant="warning" size="sm" className="me-2">Editar</Button>
              <Button variant="danger" size="sm">Deshabilitar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CourseManagement;
