// routes/documentos.js
const express = require('express');
const multer = require('multer');
const Documento = require('../models/Documento');
const router = express.Router();

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Ruta para subir documento
router.post('/subir', upload.single('archivo'), async (req, res) => {
  try {
    const { carpeta, creadoPor } = req.body;
    const archivo = req.file;

    if (!archivo) {
      return res.status(400).json({ mensaje: 'No se envió archivo' });
    }

    const nuevoDoc = new Documento({
      nombre: archivo.originalname,
      url: archivo.path,
      carpeta,
      creadoPor
    });

    await nuevoDoc.save();

    res.json({ mensaje: 'Documento subido correctamente', documento: nuevoDoc });
  } catch (error) {
    console.error('Error al subir documento:', error); // 👈 Esto mostrará el error en consola
    res.status(500).json({ mensaje: 'Error al subir el documento', error: error.message });
  }
});

module.exports = router;
