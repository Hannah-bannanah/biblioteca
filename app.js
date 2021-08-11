/** First entry point to the app */
// import required modules
const express = require('express');
const path = require('path');

// import internal modules
const errorController = require('./controllers/error.controller');
const librosRouter = require('./routes/libro.route');
const sociosRouter = require('./api/routes/socio.route');

// import DB modules
const sequelize = require('./util/db.config');
const Libro = require('./models/libro.model');
const Editorial = require('./models/editorial.model');
const Autor = require('./models/autor.model');
const LibroAutor = require('./models/libro-autor.model');

// establish DB relations
Libro.belongsTo(Editorial, {
    constraints: true,
    onDelete: 'CASCADE'
});
Editorial.hasMany(Libro);
Libro.belongsToMany(Autor, {
    through: LibroAutor
});
Autor.belongsToMany(Libro, {
    through: LibroAutor
});

// initialize app
const app = express();
// configure basic app parameters
const PORT = process.env.PORT || 3000;
app.set("port", PORT); //sets listening port
// parse requests
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// ejs engine
app.set('view engine', 'ejs');
app.set('views', 'views'); //set up the views folder
// set up the static giles folder (css)
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use("/api/socios", sociosRouter);
// app.use("/api", require('./api'));
app.use("/libros", librosRouter);

app.get("/home", (req, res, next) => {
    res.render("home/index", {
        pageTitle: 'ABRACABIBLIO',
        path: '/'
    });
});

app.get("/", (req, res, next) => {
    res.render("home/index", {
        pageTitle: 'ABRACABIBLIO',
        path: '/'
    });
});

//default route
app.use(errorController.error);

// initialize DB & server
const fillDB = require('./util/db.initialize');
sequelize.sync()
    .then(() => {
        return Editorial.findOne();
    })
    .then(editorial => {
        if (!editorial) {
            return fillDB();
        } else {
            return editorial;
        }
    })
    .then((result) => {
        // console.log(result);
        // listen on port
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err))