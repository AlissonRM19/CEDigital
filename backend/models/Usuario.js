const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  rol: {
    type: String,
    enum: ['profesor', 'estudiante'],
    required: true
  },
  nombre: { type: String, required: true },
  cedula: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Solo para estudiantes
  carne: { type: String, required: function() { return this.rol === 'estudiante'; } },
  telefono: { type: String, required: function() { return this.rol === 'estudiante'; } }
});

// Encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);
