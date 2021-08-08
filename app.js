/** First entry point to the app */
// import required modules
const express = require('express');
const path = require('path');

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

// route to web or api 
app.use("/api", require('./api'));

app.use("/", require('./web'));
app.use(express.static('web'));

// listen on port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));