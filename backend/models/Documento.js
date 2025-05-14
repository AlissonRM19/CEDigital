// models/Documento.js
const mongoose = require('mongoose');

const DocumentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  carpeta: { type: String, required: true },
  creadoPor: { type: String, required: true },
  url: { type: String, required: true },
  //creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  //fechaSubida: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Documento', DocumentoSchema);
