const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');


// Login para profesor
router.post('/profesor/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email, rol: 'profesor' });

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    res.json({ mensaje: 'Login correcto como profesor', usuario });

  } catch (error) {
    console.error('❌ Error en login de profesor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Login para estudiante
router.post('/estudiante/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email, rol: 'estudiante' });

  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  res.json({ mensaje: 'Login correcto como estudiante', usuario });
});

module.exports = router;