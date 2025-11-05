// ##################################################### 4️⃣ entries.controller.js → Maneja las peticiones HTTP #####################################################

const entry = require('../models/entries.model'); // Importar el modelo de entries

// ====================================================== ⚙️ CONFIGURACIÓN ======================================================

const createTableAuthors = async (req, res) => {
    try {
        await entry.createTableAuthors();
        res.status(200).json({ message: "Tabla 'authors' creada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createTableEntries = async (req, res) => {
    try {
        await entry.createTableEntries();
        res.status(200).json({ message: "Tabla 'entries' creada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const insertAuthors = async (req, res) => {
    try {
        await entry.insertAuthors();
        res.status(200).json({ message: "Autores insertados correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const insertEntries = async (req, res) => {
    try {
        await entry.insertEntries();
        res.status(200).json({ message: "Entries insertados correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addUniqueTitleConstraint = async (req, res) => {
    try {
        await entry.addUniqueTitleConstraint();
        res.status(200).json({ message: "Constraint de título único añadida correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

// ====================================================== 📝 ENTRIES ======================================================

// [GET] http://localhost:3000/api/entries - Retorna todas las entries
// EJEMPLO: GET http://localhost:3000/api/entries
const getAllEntries = async (req, res) => {
    try {
        const result = await entry.getAllEntries();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   

// [GET] http://localhost:3000/api/entries/author/:email - Retorna entries del autor (CON PARAMS)
// EJEMPLO: GET http://localhost:3000/api/entries/author/alejandru@thebridgeschool.es
const getEntriesByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await entry.getEntriesByEmail(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   

// [GET] http://localhost:3000/api/entries/search/:email - Retorna entries por email del autor
// EJEMPLO: GET http://localhost:3000/api/entries/search/birja@thebridgeschool.es
const getEntriesByAuthorEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await entry.getEntriesByAuthorEmail(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// [GET] http://localhost:3000/api/entries/title/:title - Obtiene entry por título
// EJEMPLO: GET http://localhost:3000/api/entries/title/Noticia: SOL en Madrid
const getEntryByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const result = await entry.getEntryByTitle(title);
        if (!result) {
            return res.status(404).json({ error: "Entry no encontrada" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// [POST] http://localhost:3000/api/entries - Crea nueva entry
// EJEMPLO: POST http://localhost:3000/api/entries
// BODY: {
//   "title": "Mi nueva noticia",
//   "content": "Contenido de prueba", 
//   "date": "2024-01-15",
//   "id_author": 1,
//   "category": "Tecnología"
// }
const createEntry = async (req, res) => {
    try {
        const { title, content, date, id_author, category } = req.body;
        
        // Validación básica
        if (!title || !content || !id_author || !category) {
            return res.status(400).json({ error: "Faltan campos obligatorios: title, content, id_author, category" });
        }
        
        const result = await entry.createEntry(title, content, date, id_author, category);
        res.status(201).json({ 
            message: "Entry creada exitosamente", 
            data: result 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// [PUT] http://localhost:3000/api/entries/title/:title - Modifica una entry por título
// EJEMPLO: PUT http://localhost:3000/api/entries/title/Noticia: SOL en Madrid
// BODY: {
//   "new_title": "Noticia: SOL en Madrid ACTUALIZADA",
//   "content": "Contenido actualizado...", 
//   "category": "Clima"
// }
const updateEntryByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const { new_title, content, category } = req.body;
        
        await entry.updateEntryByTitle(new_title, content, category, title);
        res.status(200).json({ 
            message: `Se ha modificado la entry '${title}'`,
            new_title: new_title || title
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}  

// [DELETE] http://localhost:3000/api/entries/title/:title - Borra una entry por título
// EJEMPLO: DELETE http://localhost:3000/api/entries/title/Noticia: SOL en Madrid
const deleteEntryByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        await entry.deleteEntryByTitle(title);
        res.status(200).json({ message: `Se ha borrado la entry '${title}'` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// ====================================================== 👤 AUTHORS ======================================================

// [GET] http://localhost:3000/api/authors - Retorna todos los autores
// EJEMPLO: GET http://localhost:3000/api/authors
const getAllAuthors = async (req, res) => {
    try {
        const result = await entry.getAllAuthors();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}    
 
// [GET] http://localhost:3000/api/authors/email/:email - Retorna autor por email (CON PARAMS)
// EJEMPLO: GET http://localhost:3000/api/authors/email/alejandru@thebridgeschool.es
const getAuthorByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await entry.getAuthorByEmail(email);
        if (!result) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 
    
// [POST] http://localhost:3000/api/authors/ - Crea nuevo autor
// EJEMPLO: POST http://localhost:3000/api/authors
// BODY: {
//   "name": "Carlos",
//   "surname": "Pérez",
//   "email": "carlos@test.com", 
//   "image": "https://randomuser.me/api/portraits/men/99.jpg"
// }
const createAuthor = async (req, res) => {
    try {
        const { name, surname, email, image } = req.body;
        
        // Validación básica
        if (!name || !surname || !email) {
            return res.status(400).json({ error: "Faltan campos obligatorios: name, surname, email" });
        }
        
        await entry.createAuthor(name, surname, email, image);
        res.status(201).json({ 
            message: `Usuario creado: ${email}`,
            data: { name, surname, email, image }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// [PUT] http://localhost:3000/api/authors/email/:email - Actualiza autor por email
// EJEMPLO: PUT http://localhost:3000/api/authors/email/carlos@test.com
// BODY: {
//   "name": "Carlos",
//   "surname": "Pérez Updated",
//   "image": "https://randomuser.me/api/portraits/men/100.jpg"
// }
const updateAuthorByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const { name, surname, image } = req.body;
        
        await entry.updateAuthorByEmail(name, surname, image, email);
        res.status(200).json({ 
            message: `Usuario actualizado: ${email}`,
            data: { name, surname, email, image }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}    

// [DELETE] http://localhost:3000/api/authors/email/:email - Borra autor por email
// EJEMPLO: DELETE http://localhost:3000/api/authors/email/carlos@test.com
const deleteAuthorByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        await entry.deleteAuthorByEmail(email);
        res.status(200).json({ message: `Se ha borrado el autor: ${email}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}    

// ====================================================== 🔍 CONSULTAS ESPECIALES ======================================================

// [GET] http://localhost:3000/api/entries-with-authors/:email - Entries con datos del autor
// EJEMPLO: GET http://localhost:3000/api/entries-with-authors/alejandru@thebridgeschool.es
const getEntriesWithAuthorData = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await entry.getEntriesWithAuthorData(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// [GET] http://localhost:3000/api/entries-multiple-authors/:email1/:email2/:email3 - Entries de múltiples autores
// EJEMPLO: GET http://localhost:3000/api/entries-multiple-authors/alejandru@thebridgeschool.es/birja@thebridgeschool.es/alvaru@thebridgeschool.es
const getEntriesMultipleAuthors = async (req, res) => {
    try {
        const { email1, email2, email3 } = req.params;
        const result = await entry.getEntriesMultipleAuthors(email1, email2, email3);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   

// [GET] http://localhost:3000/api/check-author/:email - Verifica si autor existe
// EJEMPLO: GET http://localhost:3000/api/check-author/alejandru@thebridgeschool.es
const checkAuthorExists = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await entry.checkAuthorExists(email);
        res.status(200).json({ 
            exists: result,
            email: email 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// ====================================================== 🎯 FUNCIONES DE COMPATIBILIDAD ======================================================

// Función original de updateEntry (para compatibilidad)
// EJEMPLO: PUT http://localhost:3000/api/entries/title/Noticia: SOL en Madrid
// BODY: {
//   "content": "Nuevo contenido",
//   "date": "2024-01-16", 
//   "id_author": 1,
//   "category": "Actualizada"
// }
const updateEntry = async (req, res) => {
    try {
        const { title } = req.params;
        const { content, date, id_author, category } = req.body;
        await entry.updateEntry(content, date, id_author, category, title);
        res.status(200).json({ message: `Se ha modificado la entry '${title}'` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}    

// Exportar las funciones del controlador
module.exports = {
    createTableAuthors,
    createTableEntries,
    insertAuthors,
    insertEntries,
    addUniqueTitleConstraint,
    getAllEntries,
    getEntriesByEmail,
    getEntriesByAuthorEmail,
    getEntryByTitle,
    createEntry,
    updateEntryByTitle,
    deleteEntryByTitle,
    getAllAuthors,
    getAuthorByEmail,
    createAuthor,
    updateAuthorByEmail,
    deleteAuthorByEmail,
    getEntriesWithAuthorData,
    getEntriesMultipleAuthors,
    checkAuthorExists,
    updateEntry
}