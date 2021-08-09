/** First entry point to the app */
// import required modules
const express = require('express');
const path = require('path');

// import internal modules
const errorController = require('./controllers/error.controller');
const librosRouter = require('./routes/libro.route');
const sociosRouter = require('./api/routes/socio.route');

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

// reroute appropriately
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

// listen on port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));