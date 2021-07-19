/** First entry point to the app */
// import required modules
const express = require('express');

// initialize app
const app = express();
// configure basic app parameters
const PORT = process.env.PORT || 3000;
app.set("port", PORT); //sets listening port
// parse requests
app.use(express.urlencoded())
app.use(express.json());

// route to web or api 
app.use("/api", require('./api'));

app.use("/", require('./web'));
app.use(express.static('web'));

// listen on port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));