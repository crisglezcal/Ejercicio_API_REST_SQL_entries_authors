// ##################################################### 6️⃣ app.js → Crea y configura el servidor Express #####################################################

// ====================================================== 💻 SERVIDOR - CONFIGURACIÓN DEL PROYECTO ======================================================

const express = require("express"); // => Importando express
const app = express(); // => Creando el servidor
const port = 3000; // => Puerto de pruebas
require("dotenv").config(); // => Configuración de variables de entorno
app.use(express.json()); // => Habilitar recepción de JSON por mi backend = Traducción a JSON

//Middleware para 404 not found
const error404 = require("./middlewares/error404");
//Morgan
const morgan = require("./middlewares/morgan");
// Configuración del logger con Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

const entriesRoutes = require("./routes/entries.routes") // => Importando rutas de entries

// ====================================================== 🛣️ HABILITANDO RUTAS ======================================================

// Ruta raíz - Usar las rutas definidas en entries.routes.js
app.get("/", (req, res) => {
  res.send("Ruta raíz");
});

// Rutas habilitadas
app.use('/api', entriesRoutes); // => http://localhost:3000/api/...
app.use(error404); // => Manejo de rutras no encontradas

// ====================================================== 🚀 INICIAR SERVIDOR ======================================================

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});