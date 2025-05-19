// routes/usuarios.js
const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/registro', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // 🔐 Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save(); // Esto activa el pre('save') y encripta


    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;
