// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginEstudiante from './pages/LoginEstudiante';
import LoginProfesor from './pages/LoginProfesor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginEstudiante />} />
        <Route path="/profesor" element={<LoginProfesor />} />
      </Routes>
    </Router>
  );
}

export default App;
