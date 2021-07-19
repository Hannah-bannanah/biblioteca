CREATE DATABASE IF NOT EXISTS Biblioteca;
Use Biblioteca;

CREATE TABLE socio (
	id_socio INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    nacionalidad VARCHAR(30) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE editorial (
	id_editorial INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    pais VARCHAR(50) NOT NULL,
    especialidad VARCHAR(50) NOT NULL,
    web VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE autor (
	id_autor INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(50) NOT NULL
);

CREATE TABLE libro (
	isbn VARCHAR(20) PRIMARY KEY,
    titulo VARCHAR(300) NOT NULL,
    id_editorial INT REFERENCES editorial(id_editorial),
    genero VARCHAR(30) NOT NULL,
    ejemplares INT NOT NULL,
    idioma VARCHAR(30) NOT NULL,
    numero_paginas INT NOT NULL,
    año_edicion INT NOT NULL
);

-- Necesitamos una tabla renacida:
CREATE TABLE libro_autor (
	isbn VARCHAR(20) NOT NULL,
    id_autor INT NOT NULL,
    PRIMARY KEY (isbn, id_autor),
    CONSTRAINT fk_isbn FOREIGN KEY(isbn) REFERENCES libro(isbn) ON DELETE CASCADE,
    CONSTRAINT fk_autor FOREIGN KEY(id_autor) REFERENCES autor(id_autor) ON DELETE CASCADE
);

'''
-- Comentada porque esta tabla no es necesaria aún 
CREATE TABLE prestamo (
	id_prestamo INT PRIMARY KEY AUTO_INCREMENT,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    isbn VARCHAR(20) REFERENCES libro(isbn),
    id_socio INT REFERENCES socio(id_socio),
    libro_devuelto BOOLEAN NOT NULL
);
'''

-- INSERCIONES EN TABLAS - ÁLVARO:
INSERT INTO socio (nombre, apellidos, nacionalidad, direccion, telefono, email)
VALUES ('Julia', 'Blanco Pérez', 'España', 'C/ Pez nº10', 0123456789, 'juliablanco@gmail.com');

INSERT INTO autor (nombre, apellidos)
VALUES ("David", "Flanagan"),
	   ("Thierry", "Richard"),
	   ("Thierry", "Groussard"),
       ("Christian", "Vigouroux"),
       ("Mario", "Rubiales Gomez"),
       ("Alan", "Beaulieu"),
       ("Ismael", "López Quintero"),
       ("Eric", "Matthes"),
       ("Óscar", "Ramírez Jiménez");
       
INSERT INTO editorial (nombre, pais, especialidad, web, telefono, email)
VALUES ("Anaya Multimedia", "España", "General", "www.anayamultimedia.es/", "(34) 91 393 88 12", "a_multimedia@anaya.es"),
	   ("ENI", "Varios", "Informática", "www.ediciones-eni.com/", "(34) 93 424 64 01", "info@ediciones-eni.com"),
       ("Altaria", "España", "Imagen-Sonido/IT/Psicología/RRHH", "www.altariaeditorial.com/", "(34) 93 516 19 66", "info@altariaeditorial.com"),
       ("Marcombo", "Varios", "Tecnología/Ciencia", "www.marcombo.com/", "(34) 93 318 00 79", "info@marcombo.com");
       
INSERT INTO libro (isbn, titulo, id_editorial, genero, ejemplares, idioma, numero_paginas, año_edicion)
VALUES ("9788441522022", "JavaScript: La Guía Definitiva", 1, "Informática", 5, "Castellano", 1168, 2007),
	   ("9782409027406", "Java 11: Los fundamentos del lenguaje Java (con ejercicios prácticos corregidos)", 2, "Informática", 2, "Castellano", 560, 2020),
       ("9782409019845", "Aprender a desarrollar con JavaScript (3ª edición)", 2, "Informática", 4, "Castellano", 821, 2019),
       ("9788441544147", "Curso de desarrollo web: HTML, CSS y JavaScript (Ed. 2021)", 1, "Informática", 2, "Castellano", 392, 2021),
       ("9788441526372", "Aprende SQL (2ª ED).", 1, "Informática", 3, "Castellano", 384, 2009),
       ("9788494404931", "Node.js avanzado: Manual práctico de JavaScript del lado del servidor", 3, "Informática", 4, "Castellano", 537, 2015),
       ("9788441543348", "Curso intensivo de Python (2ª ED.): Introducción práctica a la programación basada en proyectos", 1, "Informática", 1, "Castellano", 544, 2021),
       ("9788426732279", "Python a fondo: Domine en lenguaje del presente y del futuro", 4, "Informática", 3, "Castellano", 648, 2021);

INSERT INTO libro_autor (isbn, id_autor)
VALUES ("9788441522022", 1),
	   ("9782409027406", 2),
	   ("9782409027406", 3),
       ("9782409019845", 4),
       ("9788441544147", 5),
       ("9788441526372", 6),
       ("9788494404931", 7),
       ("9788441543348", 8),
       ("9788426732279", 9);
       
-- INSERCIONES EN TABLAS - MIGUE:
INSERT INTO socio (nombre, apellidos, nacionalidad, direccion, telefono, email)
VALUES ('Migue', 'Moreno de la Rosa', 'España', 'C/ Jerez nº13', 666777888, 'estudiante@gmail.com');

INSERT INTO autor (nombre, apellidos)
VALUES	("Shyam", "Seshadri"),
		("Eric A.", "Meyer"),
        ("Estelle", "Weyl"),
        ("Jon", "Yablonski"),
        ("Ethan", "Brown");

INSERT INTO editorial (nombre, pais, especialidad, web, telefono, email)
VALUES ("O’Reilly Media", "Estados Unidos", "Tecnología e informática", "https://www.oreilly.com/", "(707) 827-7019", "support@oreilly.com");

INSERT INTO libro (isbn, titulo, id_editorial, genero, ejemplares, idioma, numero_paginas, año_edicion)
VALUES	("9781491999837", "Angular: Up and Running", 5, "Informática", 5, "Inglés", 311, 2018),
		("9781449393199", "CSS: The Definitive Guide", 5, "Informática", 6, "Inglés", 1091, 2017),
		("9781492055310", "Laws of UX", 5, "Informática", 3, "Inglés", 153, 2020),
        ("9781491914915", "Learning JavaScript", 5, "Informática", 7, "Inglés", 350, 2016);

INSERT INTO libro_autor (isbn, id_autor)
VALUES 	("9781491999837", 10),
		("9781449393199", 11),
        ("9781449393199", 12),
        ("9781492055310", 13),
        ("9781491914915", 14);


-- INSERCIONES EN TABLAS - PILAR:
INSERT INTO socio (nombre, apellidos, nacionalidad, direccion, telefono, email)
VALUES ('Amalia', 'Jiménez Lozano', 'España', 'Av. de la Arruzafilla nº25', 654321278, 'ajimloz@gmail.com');

INSERT INTO editorial (nombre, pais, especialidad, web, telefono, email)
VALUES  ("Editorial Universitaria Ramón Areces", "España", "General", "www.cerasa.es/", "(34) 91 506 11 90", "cerasa@cerasa.es"),
    ("Booket", "España", "General", "www.planeta.es/es/booket", "(34) 93 492 88 15", "info@booket.com"),
    ("Financial Times Prentice Hall", "EEUU", "Finanzas", "www.ftpress.com/", "NA", "community@informit.com"),
    ("Addison-Wesley", "EEUU", "Informática", "www.pearson.com/us/higher-education.html", "NA", "NA"),
    ("Planeta", "España", "General", "www.planeta.es", "NA", "departamentoliterario@planeta.es");

INSERT INTO autor (nombre, apellidos)
VALUES  ("José María", "Casas Sánchez"),
    ("Gianni", "Rodari"),
    ("Robert C", "Martin"),
    ("Dean", "Wampler"),
    ("Kevlin", "Henney"),
    ("José Manuel", "López Nicolás");

INSERT INTO libro (isbn, titulo, id_editorial, genero, ejemplares, idioma, numero_paginas, año_edicion)
VALUES  ("9788480046589", "Fórmulas y tablas estadísticas", 5, "Estadística", 1, "Castellano", 144, 2004),
    ("9788484531643", "Gramática de la fantasia: Introducción al arte de contar historias", 6, "Psicología", 2, "Castellano", 272, 2002),
    ("9780132350884", "Clean Code: A Handbook of Agile Software Craftsmanship", 7, "Informática", 1, "Inglés", 464, 2008),
    ("9780134494166", "Clean Architecture: A Craftsman's Guide to Software Structure and Design: A Craftsman's Guide to Software Structure and Design", 7, "Informática", 1, "Inglés", 432, 2017),
    ("9788408243151", "La ciencia de los campeones: Deporte, triunfo y revolución científica", 9, "Ciencia", 2, "Castellano", 384, 2021);

INSERT INTO libro_autor (isbn, id_autor)
VALUES  ("9788480046589", 15),
    ("9788484531643", 16),
    ("9780132350884", 17),
    ("9780132350884", 18),
    ("9780134494166", 17),
    ("9780134494166", 19),
    ("9788408243151", 20);




-- INSERCIONES DE MUESTRA JANA:
INSERT INTO autor (nombre, apellidos)
VALUES ("Joseph", "Heller"),
	   ("Michael", "Chabon"),
	   ("Graham", "Green"),
       ("John", "Steinbeck"),
	   ("Michael", "Ende");

INSERT INTO editorial (nombre, pais, especialidad, web, telefono, email)
VALUES ("Vintage Publishing", "Reino Unido", "General","http://knopfdoubleday.com", "NA", "knopfpublicity@randomhouse.com"),
	   ("DeBolsillo", "Espana", "General", "http://www.penguinrandomhousegrupoeditorial.com", "(34) 93 366 03 00", "NA"),
	   ("Oceano", "Espana", "General", "https://www.oceano.com/oceano/", "(+34) 93 280 20 20", "NA"),
       ("Austral", "Espana", "General", "https://www.planetadelibros.com/editorial/austral/33", "(34) 93 492 88 15","info@australeditorial.com"),
	   ("Alfaguara", "Espana", "General", "http://www.alfaguara.com", "(34) 93 663 30 30", "atencionalcliente@penguinrandomhouse.com");

INSERT INTO libro (isbn, titulo, id_editorial, genero, ejemplares, idioma, numero_paginas, año_edicion)
VALUES  ("9780099470465", "Catch-22", 11, "Comedia", 5, "Ingles", 544, 2011),
        ("9788497932950", "Las asombrosas aventuras de Kavalier y Clay", 12, "Ficcion", 0, "Espanol", 736, 2004),
        ("9786077357063", "Monsenor Quijote", 13, "Comedia", 8, "Espanol", 280, 2016),
        ("9788490661444", "Al este del Eden", 14, "Ficcion", 4, "Espanol", 688, 2015),
        ("9788420471549", "La historia interminable", 15, "Fantasia", 3, "Espanol", 504, 2007);

INSERT INTO libro_autor(isbn, id_autor)
VALUES  ("9780099470465", 21),
        ("9788497932950", 22),
        ("9786077357063", 23),
        ("9788490661444", 24),
        ("9788420471549", 25);
        
      
'''  
-- QUERIES DE PRUEBA - ÁLVARO:     
     
SELECT libro.titulo AS TÍTULO,
	   libro.isbn AS ISBN,
       CONCAT(autor.nombre, " ", autor.apellidos) AS AUTOR,
       editorial.nombre AS EDITORIAL,
       libro.genero AS GÉNERO,
       libro.numero_paginas AS NÚMERO_PÁGINAS,
       libro.idioma AS IDIOMA,
       libro.año_edicion AS AÑO_EDICIÓN
FROM libro
INNER JOIN libro_autor
ON libro.isbn = libro_autor.isbn
INNER JOIN editorial
ON editorial.id_editorial = libro.id_editorial
INNER JOIN autor
ON autor.id_autor = libro_autor.id_autor
ORDER BY AÑO_EDICIÓN DESC;


SELECT libro.isbn AS ISBN, 
	   libro.titulo AS TÍTULO,
       CONCAT(autor.nombre, " ", autor.apellidos) AS AUTOR,
       editorial.nombre AS EDITORIAL,
       libro.genero AS GÉNERO,
       libro.idioma AS IDIOMA,
       libro.numero_paginas AS NÚMERO_PÁGINAS,
	   libro_autor.id_autor AS ID_AUTOR,
       libro.id_editorial AS ID_EDITORIAL
FROM libro
INNER JOIN libro_autor
ON libro.isbn = libro_autor.isbn
INNER JOIN autor
ON autor.id_autor = libro_autor.id_autor
INNER JOIN editorial
ON editorial.id_editorial = libro.id_editorial;


SELECT libro.titulo AS TÍTULO,
	   CONCAT(autor.nombre, " ", autor.apellidos) AS AUTOR
FROM libro
INNER JOIN libro_autor
ON libro.isbn = libro_autor.isbn
INNER JOIN autor
ON autor.id_autor = libro_autor.id_autor
WHERE libro.titulo = "Java 11: Los fundamentos del lenguaje Java (con ejercicios prácticos corregidos)";
'''
