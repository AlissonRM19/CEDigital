// models/crearUsuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./Usuario');
require('dotenv').config();

async function crearUsuario() {
  await mongoose.connect(process.env.MONGO_URI);

  const passwordHash = await bcrypt.hash('123456', 10); // esta será la contraseña

  try {
    const nuevoUsuario = new Usuario({
      email: 'profesor2@gmail.com',
      password: passwordHash,
      rol: 'profesor'
    });

    await nuevoUsuario.save();
    console.log('✅ Usuario creado correctamente');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

crearUsuario();
