const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

// Registro de usuario (profesor o estudiante)
router.post('/registro', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  // Verifica si ya existe el usuario
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(400).json({ mensaje: 'El usuario ya existe' });
  }

  // Encripta la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const nuevoUsuario = new Usuario({
    nombre,
    email,
    password: hashedPassword,
    rol // 'profesor' o 'estudiante'
  });

  await nuevoUsuario.save();
  res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
});

module.exports = router;
