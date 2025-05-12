// server.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const loginRoutes = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'  // <-- permite a Vite acceder
}));

const documentosRoutes = require('./routes/documentos');
app.use('/api/documentos', documentosRoutes);

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('🔴 Error al conectar a MongoDB:', err));

// Rutas
app.use('/api', loginRoutes); // <-- Se accede como /api/profesor/login y /api/estudiante/login

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});