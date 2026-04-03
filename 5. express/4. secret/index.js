import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import logger from './logger.js';
import auth from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(logger);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", auth, (req, res) => {
    console.log(`Password authenticated: ${req.body.password}`);
    res.sendFile(__dirname + "/public/secret.html");
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
});