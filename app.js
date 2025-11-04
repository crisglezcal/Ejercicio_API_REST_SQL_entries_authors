// ######################################################### NODE - EXPRESS #########################################################

// ====================================================== 💻 SERVIDOR - CONFIGURACIÓN DEL PROYECTO ======================================================

const express = require("express"); // => Importando express
const app = express(); // => Creando el servidor
const port = 3000; // => Puerto de pruebas
app.use(express.json()); // => Habilitar recepción de JSON por mi backend = Traducción a JSON

const entriesRoutes = require("./routes/entries.routes") // => Importando rutas de entries

// ====================================================== 🛣️ HABILITANDO RUTAS ======================================================

// Ruta raíz - Usar las rutas definidas en entries.routes.js
app.get("/", (entriesRoutes) => { 
  res.send("Ruta raíz");
});

// Rutas habilitadas
app.use('/api/entries',entriesRoutes); // => http://localhost:3000/api/entries

// ====================================================== 🚀 INICIAR SERVIDOR ======================================================

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
