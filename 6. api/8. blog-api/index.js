import express from "express";
import axios from "axios";
import morgan from "morgan";
import config from "./src/config.js";

const app = express();
const PORT = 3000;
const API_BASE_URL = config.API_BASE_URL;

app.set("view engine", "ejs");
app.set("views", "./src/views/pages");
app.use(express.static("public"));

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        const data = response.data;

        res.render("index.ejs", { posts: data });
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`);

        res.status(500).json({
            message: "Error fetching posts.",
        });
    }
});

app.get("/new", (req, res) => {
    res.render("modify.ejs", {
        heading: "New Post",
        submit: "Create Post",
    });
});

app.get("/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${req.params.id}`);
        const data = response.data;

        console.log(data);

        res.render("modify.ejs", {
            heading: "Edit Post",
            submit: "Update Post",
            post: data,
        });
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`);

        res.status(500).json({
            message: "Error fetching posts.",
        });
    }
});

app.post("/api/posts", async (req, res) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts`, req.body);
        const data = response.data;

        console.log(data);

        res.redirect("/");
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`);

        res.status(500).json({
            message: "Error creating post.",
        });
    }
});

app.post("/api/posts/:id", async (req, res) => {
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/posts/${req.params.id}`, req.body
        );
        const data = response.data;

        console.log(data);

        res.redirect("/");
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`);

        res.status(500).json({
            message: "Error updating post.",
        });
    }
});

app.get("/api/posts/delete/:id", async (req, res) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/posts/${req.params.id}`);
        const data = response.data;

        console.log(data);

        res.redirect("/");
    } catch (error) {
        console.error(`[ERROR]: ${error.message}`);

        res.status(500).json({
            message: "Error deleting post.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Frontend running on: http://localhost:${PORT}`);
});