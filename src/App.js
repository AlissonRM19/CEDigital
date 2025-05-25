import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './Components/LoginForm/LoginForm';
import AdminDashboard from './Pages/AdminDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import ProfessorDashboard from './Pages/ProfessorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/professor" element={<ProfessorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
