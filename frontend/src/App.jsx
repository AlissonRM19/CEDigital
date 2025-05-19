// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginProfesor from './pages/LoginProfesor';
import ProfesorPage from './pages/ProfesorPage';
//import RegistroProfesor from './pages/RegistroProfesor';
import Registro from './components/Registro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginProfesor />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/profesor/dashboard" element={<ProfesorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
