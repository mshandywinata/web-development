import express from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();
const PORT = 3000;
const BASE_URL = "https://api.europeana.eu/record/v2";
const API_KEY = "bellambl";

let count = 0;

const initCount = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/search.json`,{
            params: {
                wskey: API_KEY,
                query: 'Indonesia AND (what:painting OR what:sculpture OR what:artwork)',
                media: true,
                rows: 0,
                qf: 'TYPE:IMAGE',
            },
        });
        const result = response.data;
        count = result.totalResults;

        console.log(`[SUCCESS] count = ${count}`);
    } catch (error) {
        console.log(`[ERROR] ${error.message}`);
    }
};

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/images/random");
});

app.get("/images/random", async (req, res) => {
    const randomStart = Math.floor(Math.random() * count) + 1;
    console.log(`[RAND] ${randomStart}`);
    
    try {
        const response = await axios.get(`${BASE_URL}/search.json`,{
            params: {
                wskey: API_KEY,
                query: 'Indonesia AND (what:painting OR what:sculpture OR what:artwork)',
                media: true,
                rows: 1,
                start: randomStart,
                profile: 'rich',
                qf: 'TYPE:IMAGE',
            },
        });
        const result = response.data.items[0];

        res.json({
            title: result.title[0],
            creator: result.dcCreator[0] ? result.dcCreator[0] : 'Unknown Artist',
            provider: result.dataProvider[0] ? result.dataProvider[0] : "",
            imageUrl: result.edmPreview[0] ? result.edmPreview[0] : null,
            europeanaLink: result.guid,
        });
    } catch (error) {
        console.log(`[ERROR] ${error.message}`);
    }
});

app.listen(PORT, async () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    await initCount();
});