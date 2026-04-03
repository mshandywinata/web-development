import express from "express";
import morgan from "morgan";
import { RECIPE_JSON, RECIPE_MAP } from "./const.js";

const app = express();
const PORT = 3000;

app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extends: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { choice: null });
});

app.post("/recipe", (req, res) => {
    const choice = req.body.choice;
    const data = JSON.parse(RECIPE_JSON);
    const index = parseInt(RECIPE_MAP[choice]);

    const { name, ingredients } = data[index]; 
    console.log(`${choice}, ${index}, ${name}`);

    res.render("index.ejs", { choice, name, protein: ingredients.protein, salsa: ingredients.salsa, toppings: ingredients.toppings });
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
