const entry = require('../models/entries.model'); // Importar el modelo de entries

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

const getEntriesByAuthorEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await entry.getEntriesByAuthorEmail(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEntriesWithAuthorData = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await entry.getEntriesWithAuthorData(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
    
const getEntriesMultipleAuthors = async (req, res) => {
    try {
        const { email1, email2, email3 } = req.params;
        const result = await entry.getEntriesMultipleAuthors(email1, email2, email3);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   

const updateEntry = async (req, res) => {
    try {
        const { title } = req.params;
        const { content, date, author_email, category } = req.body;
        await entry.updateEntry(content, date, author_email, category, title);
        res.status(200).json({ message: `Se ha modificado la entry '${title}'` });
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
    
// [GET] http://localhost:3000/api/entries - Retorna todas las entries
const getAllEntries = async (req, res) => {
    try {
        const result = await entry.getAllEntries();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   
    
// [GET] http://localhost:3000/api/entries/author/:email - Retorna entries del autor (CON PARAMS)
const getEntriesByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await entry.getEntriesByEmail(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   
    
// [PUT] http://localhost:3000/api/entries/title/:title - Modifica una entry por título
const updateEntryByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const { new_title, content, category } = req.body;
        
        await entry.updateEntryByTitle(new_title, content, category, title);
        res.status(200).json({ message: `Se ha modificado la entry '${title}'` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}  
    
// [DELETE] http://localhost:3000/api/entries/title/:title - Borra una entry por título
const deleteEntryByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        await entry.deleteEntryByTitle(title);
        res.status(200).json({ message: `Se ha borrado la entry '${title}'` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// [GET] http://localhost:3000/api/authors - Retorna todos los autores
const getAllAuthors = async (req, res) => {
    try {
        const result = await entry.getAllAuthors();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}    
 
// [GET] http://localhost:3000/api/authors/email/:email - Retorna autor por email (CON PARAMS)
const getAuthorByEmail = async (req, res) => {
    try {
        const { email } = req.params; // ← USAR PARAMS para /email/:email
        const result = await entry.getAuthorByEmail(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 
    
// [POST] http://localhost:3000/api/authors/ - Crea nuevo autor
const createAuthor = async (req, res) => {
    try {
        const { name, surname, email, image } = req.body;
        await entry.createAuthor(name, surname, email, image);
        res.status(201).json({ message: `usuario creado: ${email}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
    
const checkAuthorExists = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await entry.checkAuthorExists(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
    
// [PUT] http://localhost:3000/api/authors/email/:email - Actualiza autor por email
const updateAuthorByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const { name, surname, image } = req.body;
        await entry.updateAuthorByEmail(name, surname, image, email);
        res.status(200).json({ message: `usuario actualizado: ${email}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}    

// [DELETE] http://localhost:3000/api/authors/email/:email - Borra autor por email
const deleteAuthorByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        await entry.deleteAuthorByEmail(email);
        res.status(200).json({ message: `Se ha borrado ${email}` });
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
    getEntriesByAuthorEmail,
    getEntriesWithAuthorData,
    getEntriesMultipleAuthors,
    updateEntry,
    addUniqueTitleConstraint,
    getAllEntries,
    getEntriesByEmail,
    updateEntryByTitle,
    deleteEntryByTitle,
    getAllAuthors,
    getAuthorByEmail,
    createAuthor,
    checkAuthorExists,
    updateAuthorByEmail,
    deleteAuthorByEmail
}