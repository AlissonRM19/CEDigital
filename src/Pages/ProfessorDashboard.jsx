import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import DocumentManager from '../Components/DocumentManager/DocumentManager';
import RubricManager from '../Components/RubricManager/RubricManager';
import EvaluationAssigner from '../Components/EvaluationAssigner/EvaluationAssigner';
import DeliverableEvaluator from '../Components/DeliverableEvaluator/DeliverableEvaluator';
import NewsManager from '../Components/NewsManager/NewsManager';
import GradeReportProfessor from '../Components/GradeReportProfessor/GradeReportProfessor';
import StudentListReport from '../Components/StudentListReport/StudentListReport';

const ProfessorDashboard = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleCourseChange = (e) => {
    const courseId = parseInt(e.target.value);
    setSelectedCourseId(courseId);
  };

  const selectedCourse = user?.courses?.find(course => course.id === selectedCourseId);

  return (
    <Container className="mt-4 text-white">
      <h2>Bienvenido, {user?.name || 'Profesor'}</h2>
      <hr />

      <Form.Group controlId="courseSelector" className="mb-3">
        <Form.Label>Selecciona un curso:</Form.Label>
        <Form.Select onChange={handleCourseChange} value={selectedCourseId || ''}>
          <option value="">-- Elige un curso --</option>
          {user?.courses?.map(course => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {selectedCourse && (
        <>
          <h4>Curso seleccionado: {selectedCourse.name}</h4>
          <hr />
          <DocumentManager user={user} course={selectedCourse} />
          <RubricManager user={user} course={selectedCourse} />
          <EvaluationAssigner user={user} course={selectedCourse} />
          <DeliverableEvaluator user={user} course={selectedCourse} />
          <NewsManager user={user} course={selectedCourse} />
          <GradeReportProfessor user={user} course={selectedCourse} />
          <StudentListReport user={user} course={selectedCourse} />
        </>
      )}
    </Container>
  );
};

export default ProfessorDashboard;
