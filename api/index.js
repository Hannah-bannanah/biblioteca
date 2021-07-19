/** API route handler */
// import necessary modules
const express = require ('express');


// initialize api router
const apiRouter = express.Router();
// configure api router
apiRouter.use(express.urlencoded({extended: true}));
apiRouter.use(express.json());

//start routing
apiRouter.get("/", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h1>You have reached my API</h1>");
    res.end();
});

apiRouter.use("/socios", require("./routes/socios.route"));


module.exports = apiRouter;