const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    console.log(req);
    res.send("hello, world!");
    // console.log(res);
});

app.get("/about", (req, res) => {
    res.send("inspos about me");
});

app.get("/contact", (req, res) => {
    res.send("call me trough these");
});

app.post("/register", (req, res) => {
    res.sendStatus(201);
});

app.put("/user/:username", (req, res) => {
    res.sendStatus(200);
});

app.patch("/user/:username", (req, res) => {
    res.sendStatus(200);
});

app.delete("/user/:username", (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`server currently running on: ${PORT}`);
});