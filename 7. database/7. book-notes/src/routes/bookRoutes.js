import express from "express";

const router = express.Router();

router.get("/book", getAllBooks);

export default router;
