// app.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./Usuario');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Login para profesor
app.post('/api/profesor/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email, rol: 'profesor' });

  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  res.json({ mensaje: 'Login correcto como profesor', usuario });
});

// Login para estudiante
app.post('/api/estudiante/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email, rol: 'estudiante' });

  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  res.json({ mensaje: 'Login correcto como estudiante', usuario });
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
