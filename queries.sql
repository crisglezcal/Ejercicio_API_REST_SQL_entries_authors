----------------------------------------------------- QUERIES EJERCICIO ---------------------------------------------------------

-- Crear tabla authors => createTableAuthors
CREATE TABLE authors (
  id_author serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  surname varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  image varchar(255)
);

-- Crear tabla entries => createTableEntries
CREATE TABLE entries (
  id_entry serial NOT NULL PRIMARY KEY, 
  title varchar(100) NOT NULL, 
  content text NOT NULL, 
  date date DEFAULT CURRENT_DATE,
  id_author int,
  category varchar(15),
  FOREIGN KEY (id_author) REFERENCES authors(id_author)
);

-- Insertar datos en tabla authors => insertAuthors
INSERT INTO authors(name,surname,email,image)
VALUES
('Alejandru','Regex','alejandru@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/75.jpg'),
('Birja','Rivera','birja@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/60.jpg'),
('Alvaru','Riveru','alvaru@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/45.jpg'),
('Muchelle','Wuallus','muchelle@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/women/72.jpg'),
('Albertu','Henriques','albertu@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/33.jpg'),
('Guillermu','Develaweyer','guillermu@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/34.jpg'),
('Jabier','Hespinoza','jabier@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/35.jpg');

-- Insertar datos en tabla entries => insertEntries
INSERT INTO entries(title,content,id_author,category)
VALUES 
('Noticia: SOL en Madrid','Contenido noticia 1',(SELECT id_author FROM authors WHERE email='alejandru@thebridgeschool.es'),'Tiempo'),
('Noticia: Un panda suelto por la ciudad','El panda se comió todas las frutas de una tienda',(SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'),'Sucesos'),
('El rayo gana la champions','Victoria por goleada en la final de la champions',(SELECT id_author FROM authors WHERE email='albertu@thebridgeschool.es'),'Deportes'),
('Amanece Madrid lleno de arena','La calima satura Madrid de arena. Pérdidas millonarias',(SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'),'Sucesos'),
('Descubren el motor de agua','Fin de la gasolina. A partir de ahora usaremos agua en nuestros coches',(SELECT id_author FROM authors WHERE email='alvaru@thebridgeschool.es'),'Ciencia');

-- Buscar entries por email usuario => getEntriesByAuthorEmail
SELECT * FROM entries WHERE id_author=(SELECT id_author FROM authors WHERE email='alejandru@thebridgeschool.es');

-- Buscar datos por email de usuario y cruzar datos => getEntriesWithAuthorByEmail
SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
FROM entries AS e
INNER JOIN authors AS a
ON e.id_author=a.id_author
WHERE a.email='alejandru@thebridgeschool.es'
ORDER BY e.title;

-- Buscar datos por email de 2 usuarios y cruzar datos => getEntriesMultipleAuthors
SELECT entries.title,entries.content,entries.date,entries.category,authors.name,authors.surname,authors.image
FROM entries
INNER JOIN authors
ON entries.id_author=authors.id_author
WHERE authors.email='alejandru@thebridgeschool.es' OR authors.email='alvaru@thebridgeschool.es' OR authors.email='albertu@thebridgeschool.es'
ORDER BY entries.title;

-- Actualizar datos de una entrada => updateEntry
UPDATE entries
	SET content='Back is back', date='2024-06-17', id_author=(SELECT id_author FROM authors WHERE email='alvaru@thebridgeschool.es'), category='Software'
	WHERE title='Estamos de Lunes de Back';

-- ##########################################################################################################################

------------------------------------------------------- MIS QUERIES ---------------------------------------------------------

-- Modificar la BBDD para que no se puedan insertar entries repetidas por título => addUniqueTitleConstraint
ALTER TABLE entries 
ADD CONSTRAINT unique_title UNIQUE (title);

-- Retorna todas las entries => getAllEntries
SELECT *
FROM entries;

-- Retorna las entries del autor buscado por email (sin id) => getEntriesByEmail
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
WHERE a.email = 'alejandru@thebridgeschool.es';

-- Buscar por título para editar entry => getEntryByTitle
UPDATE entries 
SET title = 'Nuevo título', 
    content = 'Nuevo contenido',
    category = 'Nueva categoría'
WHERE title = 'Noticia: SOL en Madrid';

-- Búsqueda por título de entry para borrar => deleteEntryByTitle
DELETE FROM entries 
WHERE title = 'Noticia: SOL en Madrid';

-- Retorna los datos de todos los autores => getAllAuthors
SELECT *
FROM authors;

-- Retorna los datos del autor buscado por email => getAuthorByEmail
SELECT *
FROM authors
WHERE email = 'alejandru@thebridgeschool.es';

-- Crear un nuevo autor => createAuthor
  -- Crear un nuevo autor
INSERT INTO authors (name, surname, email, image) 
VALUES ('Carlos', 'Gómez', 'carlos@thebridgeschool.es', 'https://randomuser.me/api/portraits/thumb/men/76.jpg');
  -- Comprobar que se ha guardado el nuevo autor
SELECT * FROM authors WHERE email = 'carlos@thebridgeschool.es';

-- Actualiza los datos de un autor buscado por email => updateAuthorByEmail
UPDATE authors
SET name = 'Nuevo nombre', 
    surname = 'Nuevo apellido',
    image = 'Nueva imagen'
WHERE email = 'alejandru@thebridgeschool.es';

-- Borra un autor buscado por su email => deleteAuthorByEmail
  -- 1. Primero borra los entries de ese autor
DELETE FROM entries 
WHERE id_author = (SELECT id_author FROM authors WHERE email = 'alejandru@thebridgeschool.es');
  -- 2. Luego borra el autor
DELETE FROM authors 
WHERE email = 'alejandru@thebridgeschool.es';