/* 
ESTRUCTURA DEL PROYECTO:
1️⃣ db_pgsql.js → Crea el pool de conexiones a PostgreSQL usando variables de entorno. Exporta la conexión para que todos los modelos la usen.
2️⃣ entries.queries.js → Contiene solo strings con consultas SQL (SELECT, INSERT, UPDATE). Separa la lógica SQL de la ejecución en la base de datos.
3️⃣ entries.model.js → Importa las queries y el pool, ejecuta las consultas en la base de datos. Maneja los datos y devuelve resultados al controlador.
4️⃣ entries.controller.js → Recibe las peticiones HTTP (req/res), valida datos y llama al modelo. Gestiona respuestas exitosas y errores.
5️⃣ entries.routes.js → Define las rutas de la API (/entries, /authors) y asocia cada URL con su controlador correspondiente.
6️⃣ app.js → Configura Express, middleware JSON, importa las rutas e inicia el servidor. Es el punto de entrada de la aplicación.
*/

// ##################################################### 1️⃣ db_pgsql.js → Conecta con la base de datos PostgreSQL #####################################################

const { Pool } = require('pg'); // Importar el módulo pg para PostgreSQL
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const isProduction = process.env.NODE_ENV === 'production'; 
const pool = new Pool({ // Crear un nuevo pool de conexiones
    user: process.env.PG_USER, 
    host: process.env.PG_HOST, 
    database: process.env.PG_DATABASE, 
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: isProduction ? true : false // BBDD local (false) o remota (true)
});

// Verificar conexión
pool.on('connect', () => {
    console.log('Conectado a PostgreSQL');
});

pool.on('error', (err) => {
    console.error('Error de conexión a PostgreSQL:', err);
});


module.exports = pool; // Exporta el pool de conexiones