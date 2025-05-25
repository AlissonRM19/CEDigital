import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import DocumentViewer from '../Components/DocumentViewer/DocumentViewer';
import EvaluationUploader from '../Components/EvaluationUploader/EvaluationUploader';
import GradeReport from '../Components/GradeReport/GradeReport';
import NewsFeed from '../Components/NewsFeed/NewsFeed';

const StudentDashboard = () => {
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
      <h2>Bienvenido, {user?.name || 'Estudiante'}</h2>
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
          <DocumentViewer user={user} course={selectedCourse} />
          <EvaluationUploader user={user} course={selectedCourse} />
          <GradeReport user={user} course={selectedCourse} />
          <NewsFeed user={user} course={selectedCourse} />
        </>
      )}
    </Container>
  );
};

export default StudentDashboard;
