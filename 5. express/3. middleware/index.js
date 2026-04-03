import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import express from "express";
import logger from './logger.js';
// import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// print logging
// app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

// __dirname return current working directory
// its pre-defined from the system only in commonjs
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
    res.send(`<h1>Your band name is...</h1><h2>${req.body.street} ${req.body.pet}</h2>`);
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`server currently running on http://localhost:${PORT}`);
});