import express from "express";
import bodyParser from "body-parser";
const app = express();
import http from "http"; //importamos para trabajar con http
import setRouter from "./appRouter.js"; // importamos el router
import "./services/dbMongo";
import middlewares from "./middlewares/middleware";
const cors = require("cors");

// parser application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Settings
app.set("port", process.env.PORT || 5000);

// crear server
app.server = http.createServer(app);

//Cors
app.use(cors());

// routes
setRouter(app);

//routes principal
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

//middlewares endpoints no encontrados
app.use(middlewares.notFoundHandler);

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
