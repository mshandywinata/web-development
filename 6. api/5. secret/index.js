import express from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();
const PORT = 3000;
const BASE_URL = "https://secrets-api.appbrewery.com";

app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/random`);
        const { secret, username } = response.data;

        res.render("index.ejs", {
            secret,
            user: username,
        });
    } catch (error) {
        console.log(`[ERROR] ${error.message}`);
        res.status(500);
    }
});

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});