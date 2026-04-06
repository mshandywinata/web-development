import express from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();
const PORT = 3000;
const BASE_URL = "https://secrets-api.appbrewery.com";

const USERNAME = "roasteducky";
const PASSWORD = "roasteducky";
const ID = Math.floor(Math.random() * 10) + 1;
const API_KEY = "fc5e80a6-3c01-4e78-8e83-9efad784738c";
const AUTH_TOKEN = "a0501594-5ff3-417c-a5f7-759106a3e290";

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "API Response." });
});

app.get("/no-auth", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/random`);
        const result = JSON.stringify(response.data);

        res.render("index.ejs", {
            content: result,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);
        res.render("index.ejs", { content: error.message });
    }
});

app.get("/basic-auth", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/all`, {
            auth: {
                username: USERNAME,
                password: PASSWORD,
            },
            params: {
                page: ID,
            },
        });
        const result = JSON.stringify(response.data);

        res.render("index.ejs", {
            content: result,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);
        res.render("index.ejs", { content: error.message });
    }
});

app.get("/api-key", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/filter`, {
            params: {
                score: ID,
                apiKey: API_KEY,
            },
        });
        const result = JSON.stringify(response.data);

        res.render("index.ejs", {
            content: result,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);
        res.render("index.ejs", { content: error.message });
    }
});

app.get("/bearer-token", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/secrets/${ID}`, {
            headers: {
               Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });
        const result = JSON.stringify(response.data);

        res.render("index.ejs", {
            content: result,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);
        res.render("index.ejs", { content: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
