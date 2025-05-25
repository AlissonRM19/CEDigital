import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Container, Row, Col, Button } from 'react-bootstrap';
import { FaBook, FaPlusCircle, FaCalendarAlt } from 'react-icons/fa';
import CourseManagement from '../Components/CourseManagement/CourseManagement';
import SemesterInit from '../Components/SemesterInit/SemesterInit';

const AdminDashboard = () => {
  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center mb-4">
        <Col md="auto">
          <h2 className="text-white text-center">Panel de Administración</h2>
        </Col>
      </Row>

      <Tabs defaultActiveKey="cursos" id="admin-dashboard-tabs" className="mb-3" fill>
        <Tab
          eventKey="cursos"
          title={
            <>
              <FaBook className="me-2" />
              Gestión de Cursos
            </>
          }
        >
          <Container className="py-3">
            <Row className="mb-3 justify-content-end">
              <Col md="auto">
                <Button variant="success">
                  <FaPlusCircle className="me-2" />
                  Crear Curso
                </Button>
              </Col>
              <Col md="auto">
                <Button variant="primary">
                  <FaCalendarAlt className="me-2" />
                  Crear Semestre
                </Button>
              </Col>
            </Row>
            <CourseManagement />
          </Container>
        </Tab>

        <Tab
          eventKey="semestre"
          title={
            <>
              <FaCalendarAlt className="me-2" />
              Inicializar Semestre
            </>
          }
        >
          <Container className="py-3">
            <SemesterInit />
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
