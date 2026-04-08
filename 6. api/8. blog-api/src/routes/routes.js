import express from "express";
import { createPost, deleteAllPosts, deletePostById, getAllPosts, getPostById, updatePostById } from "../services/services.js";
import { API_KEY } from "../server.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/api/posts");
});

router.get("/posts", (req, res) => {
    const data = getAllPosts();

    if (!data) {
        return res.status(404).json({
            "error" : "No available posts."
        });
    }

    res.status(200).json(data);
});

router.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).json({
            "error": "Valid id required."
        });
    }

    const target = getPostById(id);

    if (!target) {
        return res.status(404).json({
            "error": `Post with id: ${id} not found.`
        });
    }

    res.status(200).json(target);
});

router.post("/posts", (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    }

    if (!post.title || !post.content) {
        return res.status(400).json({
            "error": "Title and content field is required.",
        });
    }

    const created = createPost(post);
    
    if (!created) {
        return res.status(500).json({
            "error": "New post failed to create."
        });
    }

    res.status(200).json(created);
});

router.patch("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    if (!id) {
        return res.status(400).json({
            "error": "Valid id required."
        });
    }

    const { title, content, author } = req.body;

    if (!title && !content && !author) {
        return res.status(400).json({
            "error": "At least one of the fields is required.",
        });
    }

    const target = getPostById(id);

    if (!target) {
        return res.status(404).json({
            "error": `Post with id: ${id} not found.`
        });
    }

    const patch = {
        title: title || target.title,
        content: content || target.content,
        author: author || target.author,
    };

    const updated = updatePostById(id, patch);

    if (!updated) {
        return res.status(500).json({
            "error": `Post with id: ${id} failed to update.`
        })
    }

    res.status(200).json(updated);
});

router.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).json({
            "error": "Valid id required."
        });
    }

    const deleted = deletePostById(id);

    if (!deleted) {
        return res.status(404).json({
            "error": `Post with id: ${id} not found.`
        });
    }

    res.status(200).json({
        "message": `Post with id: ${id} deleted successfully.`,
    });
});

router.delete("/all", (req, res) => {
    const key = req.query.key;

    if (!key) {
        return res.status(400).json({
            "error": "API key is required.",
        });
    }

    if (key !== API_KEY) {
        return res.status(401).json({
            "error": "Unathorized access, API key is invalid.",
        })
    }

    const deleted = deleteAllPosts();

    if (!deleted) {
        return res.status(500).json({
            "error": "Failed to delete posts.",
        });
    }

    res.status(200).json({
        "message": "All posts deleted successfully.",
    });
});

export default router;