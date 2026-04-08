import express from "express";
import morgan from "morgan";
import jokes from "./jokes.js";

const app = express();
const PORT = 3000;
const API_KEY = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/random");
});

app.get("/random", (req, res) => {
    const index = Math.floor(Math.random() * jokes.length);
    const data = jokes[index];

    if (!data) {
        return res.status(404).json({
            "error": "No jokes are available."
        });
    }

    res.json(data);
});

app.get("/jokes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const data = jokes.find((joke) => {
        return joke.id === id;
    });

    if (!id) {
        return res.status(400).json({
            "error": "Valid id required."
        });
    }

    if (!data) {
        return res.status(404).json({
            "error": `Joke with id ${id} not found.`,
        });
    }

    res.json(data);
});

app.get("/filter", (req, res) => {
    const { type } = req.query;

    if (!type) {
        return res.status(400).json({
            "error": "Valid filter type required.",
        });
    }

    const data = jokes.filter((joke) => {
        return joke.jokeType === type;
    });

    res.json(data);
});

app.post("/jokes", (req, res) => {
    const { text, type } = req.body;

    if (!text || !type) {
        return res.status(400).json({
            "error": "Text and type required.",
        });
    }

    const data = {
        id: jokes.length + 1,
        jokeText: text,
        jokeType: type,
    };

    jokes.push(data);
    res.json(data);
});

app.put("/jokes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { text, type } = req.body;

    if (!id) {
        return res.status(400).json({
            "error": "Valid id required.",
        });
    }

    if (!text || !type) {
        return res.status(400).json({
            "error": "Text and type required.",
        });
    }

    const data = jokes.find((joke) => {
        return joke.id === id;
    }); 

    if (!data) {
        return res.status(404).json({
            "error": "Joke not found."
        });
    }

    data.jokeText = text;
    data.jokeType = type;

    res.json(data);
});

app.patch("/jokes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { text, type } = req.body;

    if (!id) {
        return res.status(400).json({
            "error": "Valid id required.",
        });
    }

    if (!text && !type) {
        return res.status(400).json({
            "error": "At least one of the field required.",
        });
    }

    const data = jokes.find((joke) => {
        return joke.id === id;
    });

    if (!data) {
        return res.status(404).json({
            "error": `Joke with id: ${id} not found.`
        });
    }

    if (text) data.jokeText = text;
    if (type) data.jokeType = type;

    res.json(data);
});

app.delete("/jokes/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).json({
            "error": "Valid id required.",
        });
    }
    
    const index = jokes.findIndex((joke) => {
        return joke.id === id;
    });

    if (index === -1) {
        return res.status(404).json({
            "error": `Joke with id: ${id} not found. No jokes were deleted.`
        });
    }

    jokes.splice(index, 1);

    res.status(200).json({
        "message": `Joke with id: ${id} deleted successfully.`
    });
});
    
app.delete("/all", (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({
            "error": "API key required.",
        });
    }

    if (key !== API_KEY) {
        return res.status(401).json({
            "error": "Valid API key required.",
        });
    }

    if (jokes.length === 0) {
        return res.status(404).json({
            "error": "All jokes already deleted.",
        });
    }

    jokes.length = 0;

    res.status(200).json({
        "message" : "All jokes deleted.",
    });
});


// middlware/routes handled from top-bottom
// only the unmatched would be handled here
app.use((req, res) => {
    res.status(404).json({
        "error": "Endpoint not found."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});