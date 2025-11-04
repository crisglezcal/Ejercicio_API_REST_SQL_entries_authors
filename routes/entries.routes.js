const express = require('express'); // 1. Importa el framework Express => Trae toda la funcionalidad de Express a tu archivo
const entriesController = require("../controllers/entries.controller"); // 2. Importa el controlador de entries => Trae todas las funciones que manejan la lógica de entries
const router = express.Router(); // 3. Crea un router de Express => Crea un objeto "router" que te permite definir rutas

// ================================================================================ 🛣️ RUTAS ============================================================================   

// -----------------------------------------------------
// RUTAS DE CONFIGURACIÓN (solo para desarrollo)
// -----------------------------------------------------
router.post('/setup/authors-table', entriesController.createTableAuthors);                 // POST http://localhost:3000/api/setup/authors-table
router.post('/setup/entries-table', entriesController.createTableEntries);                 // POST http://localhost:3000/api/setup/entries-table
router.post('/setup/insert-authors', entriesController.insertAuthors);                     // POST http://localhost:3000/api/setup/insert-authors
router.post('/setup/insert-entries', entriesController.insertEntries);                     // POST http://localhost:3000/api/setup/insert-entries
router.put('/setup/unique-title-constraint', entriesController.addUniqueTitleConstraint);  // PUT http://localhost:3000/api/setup/unique-title-constraint

// -----------------------------------------------------
// RUTAS DE ENTRIES (Publicaciones) 
// -----------------------------------------------------
router.get('/entries', entriesController.getAllEntries);                            // GET http://localhost:3000/api/entries (TODAS las entries)
router.get('/entries/author/:email', entriesController.getEntriesByEmail);          // GET http://localhost:3000/api/entries/author/alejandru@thebridgeschool.es (por EMAIL)
router.get('/entries/search/:email', entriesController.getEntriesByAuthorEmail);    // GET http://localhost:3000/api/entries/search/birja@thebridgeschool.es
router.get('/entries/title/:title', entriesController.getEntryByTitle);             // GET http://localhost:3000/api/entries/title/Noticia: SOL en Madrid
router.post('/entries', entriesController.createEntry);                             // POST http://localhost:3000/api/entries
router.put('/entries/title/:title', entriesController.updateEntryByTitle);          // PUT http://localhost:3000/api/entries/title/Noticia: SOL en Madrid
router.delete('/entries/title/:title', entriesController.deleteEntryByTitle);       // DELETE http://localhost:3000/api/entries/title/Noticia: SOL en Madrid

// -----------------------------------------------------
// RUTAS DE AUTHORS (Autores) - CORREGIDAS
// -----------------------------------------------------
router.get('/authors', entriesController.getAllAuthors);                            // GET http://localhost:3000/api/authors (TODOS los autores)
router.get('/authors/email/:email', entriesController.getAuthorByEmail);            // GET http://localhost:3000/api/authors/email/alejandru@thebridgeschool.es (por EMAIL)
router.post('/authors', entriesController.createAuthor);                            // POST http://localhost:3000/api/authors
router.put('/authors/email/:email', entriesController.updateAuthorByEmail);         // PUT http://localhost:3000/api/authors/email/alejandru@thebridgeschool.es
router.delete('/authors/email/:email', entriesController.deleteAuthorByEmail);      // DELETE http://localhost:3000/api/authors/email/alejandru@thebridgeschool.es

// -----------------------------------------------------
// RUTAS ESPECIALES (Consultas complejas)
// -----------------------------------------------------
router.get('/entries-with-authors/:email', entriesController.getEntriesWithAuthorData);                       // GET http://localhost:3000/api/entries-with-authors/alejandru@thebridgeschool.es
router.get('/entries-multiple-authors/:email1/:email2/:email3', entriesController.getEntriesMultipleAuthors); // GET http://localhost:3000/api/entries-multiple-authors/alejandru@thebridgeschool.es/birja@thebridgeschool.es/alvaru@thebridgeschool.es
router.get('/check-author/:email', entriesController.checkAuthorExists);                                      // GET http://localhost:3000/api/check-author/alejandru@thebridgeschool.es

// Exportar el router para usar en app.js
module.exports = router;