// models/Estudiante.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const estudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Encriptar antes de guardar
estudianteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
