// models/Documento.js
const mongoose = require('mongoose');

const DocumentoSchema = new mongoose.Schema({
  nombre: String,
  url: String,
  carpeta: String, // Ej: "Unidad 1", "Tareas", etc.
  creadoPor: String,
  //creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  //fechaSubida: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Documento', DocumentoSchema);
