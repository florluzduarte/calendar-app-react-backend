const express = require("express");
require("dotenv").config();

//Crear el servidor de Express
const app = express();

//Configuración public
app.use(express.static("public"));

//Lectura y parse de peticiones
app.use(express.json());

//Configuración de rutas
app.use("/api/auth", require("./routes/auth"));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
