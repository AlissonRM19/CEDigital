import React, { useState } from 'react';
import { Container, Card, Form, Button, Table } from 'react-bootstrap';

const SemesterInit = () => {
  const [step, setStep] = useState(1);

  const [semester, setSemester] = useState({
    year: '',
    period: ''
  });

  const [courses, setCourses] = useState([
    { code: 'INF101', name: 'Programación I', credits: 4, major: 'Ingeniería' },
    { code: 'MAT201', name: 'Cálculo II', credits: 3, major: 'Matemáticas' }
  ]);

  const periods = ['I', 'II', 'III'];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Container className="mt-4 text-white">
      <h2>Inicializar Semestre</h2>

      {/* Paso 1: Crear Semestre */}
      {step === 1 && (
        <Card className="p-3 bg-dark text-white">
          <h4>Paso 1: Crear Semestre</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="number"
                value={semester.year}
                onChange={(e) =>
                  setSemester({ ...semester, year: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Periodo</Form.Label>
              <Form.Select
                value={semester.period}
                onChange={(e) =>
                  setSemester({ ...semester, period: e.target.value })
                }
              >
                <option value="">Seleccione</option>
                {periods.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          <Button className="mt-3" onClick={handleNext}>
            Siguiente
          </Button>
        </Card>
      )}

      {/* Paso 2: Agregar Cursos al Semestre */}
      {step === 2 && (
        <Card className="p-3 bg-dark text-white">
          <h4>Paso 2: Agregar Cursos</h4>
          <Table variant="dark" striped responsive>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Créditos</th>
                <th>Carrera</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.credits}</td>
                  <td>{course.major}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <Button onClick={handleBack}>Atrás</Button>
            <Button onClick={handleNext}>Siguiente</Button>
          </div>
        </Card>
      )}

      {/* Paso 3: Asignar Profesores y Estudiantes */}
      {step === 3 && (
        <Card className="p-3 bg-dark text-white">
          <h4>Paso 3: Asignar Profesores y Estudiantes</h4>
          <p>
            (Aquí se añadirían grupos, profesores asignados y estudiantes por
            carnet)
          </p>
          <div className="d-flex justify-content-between">
            <Button onClick={handleBack}>Atrás</Button>
            <Button onClick={handleNext}>Siguiente</Button>
          </div>
        </Card>
      )}

      {/* Paso 4: Crear Estructura Documentos y Evaluaciones */}
      {step === 4 && (
        <Card className="p-3 bg-dark text-white">
          <h4>Paso 4: Crear Carpetas y Rubros</h4>
          <ul>
            <li>📁 Presentaciones</li>
            <li>📁 Quices</li>
            <li>📁 Exámenes</li>
            <li>📁 Proyectos</li>
          </ul>
          <p>Rubros de Evaluación:</p>
          <ul>
            <li>📊 Quices (30%)</li>
            <li>📊 Exámenes (30%)</li>
            <li>📊 Proyectos (40%)</li>
          </ul>
          <div className="d-flex justify-content-between">
            <Button onClick={handleBack}>Atrás</Button>
            <Button variant="success">Finalizar Inicialización</Button>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default SemesterInit;
