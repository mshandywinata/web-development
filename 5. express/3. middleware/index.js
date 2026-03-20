const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// __dirname return current working directory
// its pre-defined from the system
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`server currently running on http://localhost:${PORT}`);
});