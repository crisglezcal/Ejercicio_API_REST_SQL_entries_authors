// ##################################################### 2️⃣ entries.queries.js → Solo las consultas SQL puras (strings) #####################################################

const queries = {

    // Crear tabla authors
    createTableAuthors: `
    CREATE TABLE authors (
        id_author serial NOT NULL PRIMARY KEY, 
        name varchar(45) NOT NULL, 
        surname varchar(45) NOT NULL, 
        email varchar(100) NOT NULL UNIQUE,
        image varchar(255)
    );`,

    // Crear tabla entries
    createTableEntries: `
    CREATE TABLE entries (
        id_entry serial NOT NULL PRIMARY KEY, 
        title varchar(100) NOT NULL, 
        content text NOT NULL, 
        date date DEFAULT CURRENT_DATE,
        id_author int,
        category varchar(15),
        FOREIGN KEY (id_author) REFERENCES authors(id_author)
    );`,

    // Insertar datos en tabla authors
    insertAuthors: `
    INSERT INTO authors(name,surname,email,image)
    VALUES
    ('Alejandru','Regex','alejandru@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/75.jpg'),
    ('Birja','Rivera','birja@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/60.jpg'),
    ('Alvaru','Riveru','alvaru@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/45.jpg'),
    ('Muchelle','Wuallus','muchelle@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/women/72.jpg'),
    ('Albertu','Henriques','albertu@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/33.jpg'),
    ('Guillermu','Develaweyer','guillermu@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/34.jpg'),
    ('Jabier','Hespinoza','jabier@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/35.jpg');`,

    // Insertar datos en tabla entries
    insertEntries: `
    INSERT INTO entries(title,content,id_author,category)
    VALUES 
    ('Noticia: SOL en Madrid','Contenido noticia 1',(SELECT id_author FROM authors WHERE email='alejandru@thebridgeschool.es'),'Tiempo'),
    ('Noticia: Un panda suelto por la ciudad','El panda se comió todas las frutas de una tienda',(SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'),'Sucesos'),
    ('El rayo gana la champions','Victoria por goleada en la final de la champions',(SELECT id_author FROM authors WHERE email='albertu@thebridgeschool.es'),'Deportes'),
    ('Amanece Madrid lleno de arena','La calima satura Madrid de arena. Pérdidas millonarias',(SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'),'Sucesos'),
    ('Descubren el motor de agua','Fin de la gasolina. A partir de ahora usaremos agua en nuestros coches',(SELECT id_author FROM authors WHERE email='alvaru@thebridgeschool.es'),'Ciencia');`,

    // Crear nueva entry
    createEntry: `
    INSERT INTO entries (title, content, date, id_author, category) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;`, // $1 => title, $2 => content, $3 => date, $4 => id_author, $5 => category

    // Buscar entries por email usuario
    getEntriesByAuthorEmail: `SELECT * FROM entries WHERE id_author=(SELECT id_author FROM authors WHERE email=$1);`, // $1 => email

    // Buscar datos por email de usuario y cruzar datos
    getEntriesWithAuthorData: `
    SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    WHERE a.email=$1
    ORDER BY e.title;`, // $1 => email

    // Buscar datos por email de 2 usuarios y cruzar datos
    getEntriesMultipleAuthors: `
    SELECT entries.title,entries.content,entries.date,entries.category,authors.name,authors.surname,authors.image
    FROM entries
    INNER JOIN authors
    ON entries.id_author=authors.id_author
    WHERE authors.email=$1 OR authors.email=$2 OR authors.email=$3
    ORDER BY entries.title;`, // $1, $2, $3 => emails

    // Actualizar datos de una entrada
    updateEntry: `
    UPDATE entries
        SET content=$1, date=$2, id_author=(SELECT id_author FROM authors WHERE email=$3), category=$4
        WHERE title=$5;`, // $1 => content, $2 => date, $3 => email author, $4 => category, $5 => title

    // Modificar la BBDD para que no se puedan insertar entries repetidas por título
    addUniqueTitleConstraint: `ALTER TABLE entries ADD CONSTRAINT unique_title UNIQUE (title);`,

    // Retorna todas las entries
    getAllEntries: `SELECT * FROM entries;`,

    // Retorna las entries del autor buscado por email (sin id)
    getEntriesByEmail: `
    SELECT 
        e.title,
        e.content,
        e.date,
        e.category,
        a.name,
        a.surname,
        a.email as email_author,
        a.image
    FROM entries e
    INNER JOIN authors a ON e.id_author = a.id_author
    WHERE a.email = $1;`, // $1 => email

    // Buscar por título para editar entry
    updateEntryByTitle: `
    UPDATE entries 
    SET title = $1, 
        content = $2,
        category = $3
    WHERE title = $4;`, // $1 => new title, $2 => new content, $3 => new category, $4 => old title

    // Búsqueda por título de entry para borrar
    deleteEntryByTitle: `DELETE FROM entries WHERE title = $1;`, // $1 => title

    // Retorna los datos de todos los autores
    getAllAuthors: `SELECT * FROM authors;`,

    // Retorna los datos del autor buscado por email
    getAuthorByEmail: `SELECT * FROM authors WHERE email = $1;`, // $1 => email

    // Crear un nuevo autor
    createAuthor: `INSERT INTO authors (name, surname, email, image) VALUES ($1, $2, $3, $4);`, // $1 => name, $2 => surname, $3 => email, $4 => image
    // Comprobar que se ha guardado el nuevo autor
    checkAuthorExists: `SELECT * FROM authors WHERE email = $1;`, // $1 => email

    // Actualiza los datos de un autor buscado por email
    updateAuthorByEmail: `
    UPDATE authors
    SET name = $1, 
        surname = $2,
        image = $3
    WHERE email = $4;`, // $1 => name, $2 => surname, $3 => image, $4 => email

    // Borra un autor buscado por su email
    deleteAuthorByEmail: `
    DELETE FROM entries WHERE id_author = (SELECT id_author FROM authors WHERE email = $1);
    DELETE FROM authors WHERE email = $1;` // $1 => email
};

// Exportar el objeto queries para usar en otros archivos
module.exports = queries;