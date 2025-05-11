const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./models/Usuario');
require('dotenv').config();

async function crearUsuarios() {
  await mongoose.connect(process.env.MONGO_URI);

  const passwordHash = await bcrypt.hash('123456', 10);

  await Usuario.create([
    { email: 'profesor1@correo.com', password: passwordHash, rol: 'profesor' },
    { email: 'estudiante1@correo.com', password: passwordHash, rol: 'estudiante' }
  ]);

  console.log('Usuarios creados');
  mongoose.disconnect();
}

crearUsuarios();
