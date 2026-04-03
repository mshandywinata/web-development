import express from "express";
import axios from "axios";
import morgan from "morgan";

const app = express();
const PORT = 3000;
const BASE_URL = "https://bored-api.appbrewery.com";

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/random`);
        const result = response.data;

        console.log(result);

        res.render("index.ejs", {
            data: result,
            error: null,
        });
    } catch (error) {
        console.log(`[ERROR] `, error.message);

        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.post("/", async (req, res) => {
    console.log(req.body);
    const type = req.body.type;
    const participants = req.body.participants;

    if (type || participants) {
        try {
            const response = await axios.get(`${BASE_URL}/filter?type=${type}&participants=${participants}`);
            const result = response.data;
            const index = Math.floor(Math.random() * result.length);
    
            console.log(result[index]);
    
            res.render("index.ejs", {
                data: result[index],
                error: null,
            });
        } catch (error) {
            console.log(`[ERROR] `, error.message);

            if (error.response.status === 404) {
                res.render("index.ejs", {
                    error: "No activities that match your criteria.",
                });
            } else {
                res.render("index.ejs", {
                    error: error.message,
                });
            }

        }
    }

    else {
        res.redirect("/");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});