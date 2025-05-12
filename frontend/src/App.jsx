// src/App.jsx
//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginProfesor from './pages/LoginProfesor';
import ProfesorPage from './pages/ProfesorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginProfesor />} />
        <Route path="/profesor" element={<ProfesorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
