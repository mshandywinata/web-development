import express from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();
const PORT = 3000;
const BASE_URL = "https://secrets-api.appbrewery.com";

const AUTH_TOKEN = "a0501594-5ff3-417c-a5f7-759106a3e290";
const CONFIG = {
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
    },
};

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        content: "API Response.",
    });
});

app.post("/get-secret", async (req, res) => {
    const id = req.body.id;

    try {
        const response = await axios.get(`${BASE_URL}/secrets/${id}`, CONFIG);
        const result = JSON.stringify(response.data);

        res.render("index.ejs", {
            content: result,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);

        res.render("index.ejs", {
            content: error.message,
        })
    }
});

app.post("/post-secret", async (req, res) => {
    const secret = req.body.secret;
    const score = req.body.score
    
    try {
        const response = await axios.post(`${BASE_URL}/secrets`, {
            secret,
            score,
        }, CONFIG);
        const result = JSON.stringify(response.data);

        res.render("index.ejs", {
            content: result,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);

        res.render("index.ejs", {
            content: error.message,
        })
    }
});

app.post("/put-secret", async (req, res) => {
    const id = req.body.id;
    const secret = req.body.secret;
    const score = req.body.score;

    try {
        const response = await axios.put(`${BASE_URL}/secrets/${id}`, {
            secret,
            score,
        }, CONFIG);
        const result = JSON.stringify(response.data);

        res.render("index.ejs", {
            content: result,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);

        res.render("index.ejs", {
            content: error.message,
        })
    }
});

app.post("/patch-secret", async (req, res) => {
    const id = req.body.id;
    const secret = req.body.secret;
    const score = req.body.score;

    try {
        const response = await axios.patch(`${BASE_URL}/secrets/${id}`, {
            secret,
            score,
        }, CONFIG);
        const result = JSON.stringify(response.data);

        res.render("index.ejs", {
            content: result,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);

        res.render("index.ejs", {
            content: error.message,
        })
    }
});

app.post("/delete-secret", async (req, res) => {
    const id = req.body.id;

    try {
        const response = await axios.delete(`${BASE_URL}/secrets/${id}`, CONFIG);
        const result = JSON.stringify(response.data);

        res.render("index.ejs", {
            content: result,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);

        res.render("index.ejs", {
            content: error.message,
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});