const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

// Registro de usuario (profesor o estudiante)
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, password, rol, cedula, carnet, telefono } = req.body;
    console.log('Datos recibidos en el registro:', req.body);
    // Verifica si ya existe el usuario
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Construir objeto según el rol
    const nuevoUsuarioData = {
      nombre,
      email,
      password: hashedPassword,
      rol,
      cedula
    };

    if (rol === 'estudiante') {
      nuevoUsuarioData.carnet = carnet;
      nuevoUsuarioData.telefono = telefono;
    }

    // Agrega la cédula siempre
    if (cedula) nuevoUsuarioData.cedula = cedula;

    // Solo para estudiantes
    if (rol === 'estudiante') {
      if (carnet) nuevoUsuarioData.carnet = carnet;
      if (telefono) nuevoUsuarioData.telefono = telefono;
    }

    const nuevoUsuario = new Usuario(nuevoUsuarioData);
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
});

module.exports = router;

