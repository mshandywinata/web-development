import express from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();
const PORT = 3000;
const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

const TOTAL = 500968;

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("node_modules/bootstrap/dist/"));

app.get("/", (req, res) => {
    res.redirect("/images/random");
});

app.get("/images/random", async (req, res) => {
    let retryCount = 0;
    const MAX_RETRIES = 10;

    const fetchArtwork = async () => {
        if (retryCount >= MAX_RETRIES) {
            return res.render("index.ejs", {
                title: "Artwork Not Available",
                description: "Retries limit exceeded. Try to hit the Refresh Page button",
                imageUrl: "https://placehold.co/600x400?text=NoArtwork",
                fullImageUrl: "https://placehold.co/600x400?text=NoArtwork",
            });
        }

        const randomId = Math.floor(Math.random() * TOTAL) + 1;
        console.log(`[RAND] id = ${randomId}`);
        
        try {
            const response = await axios.get(`${BASE_URL}/${randomId}`);
            const result = response.data;
            const imageUrl = result.primaryImageSmall ? result.primaryImageSmall : result.primaryImage;
            const fullImageUrl = result.primaryImage;

            if (!imageUrl) {
                retryCount++;
                return fetchArtwork();
            }

            const artist = result.artistDisplayName ? result.artistDisplayName : "Unknown Artist/Creator";
            const year = result.objectDate ? result.objectDate : "Unknown Date";
            const provider = result.repository ? result.repository : "Unknown Repository";

            console.log(`[RESULT] ${result.title} ${imageUrl}`);

            res.render("index.ejs", {
                title: result.title,
                imageUrl,
                fullImageUrl,
                description: `${artist}, ${year}, ${provider}`,
            });

        } catch (error) {
            if (error.response) {
                console.log(`[${error.response.status}] ${error.response.statusText}`);
            } else {
                console.log(`[ERROR] ${error.message}`);
            }

            retryCount++;
            return fetchArtwork();
        };
    }

    fetchArtwork();
});

app.listen(PORT, async () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});