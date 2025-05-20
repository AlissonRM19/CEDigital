// routes/documentos.js
const express = require('express');
const multer = require('multer');
const Documento = require('../models/Documento');
const router = express.Router();
const mongoose = require('mongoose');

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

// Obtener todos los documentos
// rutas/documentos.js
/*router.get('/', async (req, res) => {
  const { profesorId } = req.query;

  if (!profesorId) {
    return res.status(400).json({ mensaje: 'Falta el ID del profesor' });
  }

  const documentos = await Documento.find({ creadoPor: profesorId });
  res.json(documentos);
});*/
router.get('/profesor/:id', async (req, res) => {
  try {
    //const documentos = await Documento.find({ creadoPor: req.params.id });
    const { id } = req.params;
    const documentos = await Documento.find({ profesorId: id }); // o el campo que uses
    res.json(documentos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener documentos' });
  }
});



// Editar documento
// PUT /api/documentos/editar/:id
/*router.put('/editar/:id', async (req, res) => {
  try {
    const { nombre, carpeta } = req.body;
    const actualizado = await Documento.findByIdAndUpdate(
      req.params.id,
      { nombre, carpeta },
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    console.error('Error al editar documento:', error);
    res.status(500).json({ mensaje: 'Error al editar documento' });
  }
});*/


router.put('/editar/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { nombre, carpeta } = req.body;

    const documentoActualizado = await Documento.findByIdAndUpdate(
      id,
      { nombre, carpeta },
      { new: true }
    );

    if (!documentoActualizado) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    res.json(documentoActualizado);
  } catch (error) {
    console.error('🔥 Error al editar documento:', error);
    res.status(500).json({
      error: 'Error al editar documento',
      detalle: error.message,
    });
  }
});

//Eliminar documentos del profesor
// DELETE /api/documentos/eliminar/:id
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const eliminado = await Documento.findByIdAndDelete(id);

    if (!eliminado) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    res.json({ mensaje: 'Documento eliminado correctamente', documento: eliminado });
  } catch (error) {
    console.error('🔥 Error al eliminar documento:', error);
    res.status(500).json({ error: 'Error al eliminar documento' });
  }
});



module.exports = router;
