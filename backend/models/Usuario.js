// models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['profesor', 'estudiante'], required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
