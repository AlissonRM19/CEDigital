const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const loginRoutes = require('./routes/login');
const usuariosRoutes = require('./routes/usuarios');
const documentosRoutes = require('./routes/documentos');

app.use('/api', loginRoutes); // /api/profesor/login etc
app.use('/api/usuarios', usuariosRoutes); // /api/usuarios/registro
app.use('/api/documentos', documentosRoutes);

// Conexión DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('🔴 Error al conectar a MongoDB:', err));

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
