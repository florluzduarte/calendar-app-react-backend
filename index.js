const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

//Crear el servidor de Express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Configuración public
app.use(express.static("public"));

//Lectura y parse de peticiones
app.use(express.json());

//Configuración de rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
