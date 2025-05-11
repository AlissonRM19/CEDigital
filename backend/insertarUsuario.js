const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./models/Usuario');

mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error("Error conectando a MongoDB", err));

const insertarUsuario = async () => {
  const email = "profesor1@gmail.com";
  const passwordPlano = "123456";
  const rol = "profesor";

  const passwordHasheado = await bcrypt.hash(passwordPlano, 10);

  const nuevoUsuario = new Usuario({
    email,
    password: passwordHasheado,
    rol
  });

  await nuevoUsuario.save();
  console.log("Usuario insertado con éxito");
  mongoose.disconnect();
};

insertarUsuario();
