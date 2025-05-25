import React from 'react';
import { Card, Table } from 'react-bootstrap';

const mockGrades = [
  { id: "123", name: "Carlos", quices: 27, examenes: 28, proyectos: 39, final: 94 },
  { id: "20220199", name: "María Solano", quices: 25, examenes: 30, proyectos: 38, final: 93 }
];

const GradeReport = ({ user }) => {
  const studentGrade = mockGrades.find(g => g.id === user.id);

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📈 Reporte de Notas</h4>
      <Table variant="dark" striped>
        <thead>
          <tr>
            <th>Nombre</th><th>Quices</th><th>Exámenes</th><th>Proyectos</th><th>Final</th>
          </tr>
        </thead>
        <tbody>
          {studentGrade && (
            <tr>
              <td>{studentGrade.name}</td>
              <td>{studentGrade.quices}</td>
              <td>{studentGrade.examenes}</td>
              <td>{studentGrade.proyectos}</td>
              <td>{studentGrade.final}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default GradeReport;
