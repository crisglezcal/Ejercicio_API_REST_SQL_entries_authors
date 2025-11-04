const { Pool } = require('pg'); // Importa el modulo pg

require('dotenv').config() // Importa dotenv para gestionar variables de entorno
// console.log(process.env); // Comprobar que se ha leído la variable de entorno

// Datos de conexión
const pool = new Pool({ // Configuracion de la conexión y leer lo que haya en el fichero .env
    user: process.env.PG_USER, 
    host: process.env.PG_HOST, 
    database: process.env.PG_DATABASE, 
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

module.exports = pool; // Exporta el pool de conexiones