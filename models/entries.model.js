// ##################################################### 3️⃣ entries.model.js → Gestiona los datos con la base de datos #####################################################

const pool = require('../config/db_pgsql'); // Importar el pool de conexiones
const queries = require('../queries/queries'); // Importar las consultas SQL

// ====================================================== 🗃️ MODELO DE DATOS ======================================================

// Configuración de la base de datos
const createTableAuthors = async () => {
    await pool.query(queries.createTableAuthors);
}

const createTableEntries = async () => {
    await pool.query(queries.createTableEntries);
}

const insertAuthors = async () => {
    await pool.query(queries.insertAuthors);
}

const insertEntries = async () => {
    await pool.query(queries.insertEntries);
}

const addUniqueTitleConstraint = async () => {
    try {
        await pool.query(queries.addUniqueTitleConstraint);
    } catch (error) {
        if (!error.message.includes('already exists')) throw error;
    }
}

// ====================================================== 📝 ENTRIES ======================================================

const getAllEntries = async () => {
    const result = await pool.query(`
        SELECT e.*, a.name, a.surname, a.email 
        FROM entries e 
        INNER JOIN authors a ON e.id_author = a.id_author
        ORDER BY e.date DESC
    `);
    return result.rows;
}

const getEntriesByEmail = async (email) => {
    const result = await pool.query(`
        SELECT e.*, a.name, a.surname, a.email 
        FROM entries e 
        INNER JOIN authors a ON e.id_author = a.id_author 
        WHERE a.email = $1
        ORDER BY e.date DESC
    `, [email]);
    return result.rows;
}

const getEntriesByAuthorEmail = async (email) => {
    const result = await pool.query(queries.getEntriesByAuthorEmail, [email]);
    return result.rows;
}

const getEntryByTitle = async (title) => {
    const result = await pool.query(`
        SELECT e.*, a.name, a.surname, a.email 
        FROM entries e 
        INNER JOIN authors a ON e.id_author = a.id_author 
        WHERE e.title = $1
    `, [title]);
    return result.rows[0];
}

const createEntry = async (title, content, date, id_author, category) => {
    const result = await pool.query(queries.createEntry, [title, content, date, id_author, category]);
    return result.rows[0];
}

const updateEntryByTitle = async (new_title, content, category, title) => {
    const result = await pool.query(queries.updateEntryByTitle, [new_title, content, category, title]);
    return result.rows[0];
}

const deleteEntryByTitle = async (title) => {
    await pool.query(queries.deleteEntryByTitle, [title]);
}

// ====================================================== 👤 AUTHORS ======================================================

const getAllAuthors = async () => {
    const result = await pool.query(queries.getAllAuthors);
    return result.rows;
}

const getAuthorByEmail = async (email) => {
    const result = await pool.query(queries.getAuthorByEmail, [email]);
    return result.rows[0];
}

const createAuthor = async (name, surname, email, image) => {
    const result = await pool.query(queries.createAuthor, [name, surname, email, image]);
    return result.rows[0];
}

const updateAuthorByEmail = async (name, surname, image, email) => {
    const result = await pool.query(queries.updateAuthorByEmail, [name, surname, image, email]);
    return result.rows[0];
}

const deleteAuthorByEmail = async (email) => {
    await pool.query(queries.deleteAuthorByEmail, [email]);
}

// ====================================================== 🔍 CONSULTAS ESPECIALES ======================================================

const getEntriesWithAuthorData = async (email) => {
    const result = await pool.query(queries.getEntriesWithAuthorData, [email]);
    return result.rows;
}

const getEntriesMultipleAuthors = async (email1, email2, email3) => {
    const result = await pool.query(queries.getEntriesMultipleAuthors, [email1, email2, email3]);
    return result.rows;
}

const checkAuthorExists = async (email) => {
    const result = await pool.query(queries.checkAuthorExists, [email]);
    return result.rows[0];
}

// Función de compatibilidad
const updateEntry = async (content, date, id_author, category, title) => {
    const result = await pool.query(queries.updateEntry, [content, date, id_author, category, title]);
    return result.rows[0];
}

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
};