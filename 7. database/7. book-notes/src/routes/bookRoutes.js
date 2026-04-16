import express from "express";
import noteRoutes from "./noteRoutes.js";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
  renderBookForm,
} from "../controllers/bookController.js";

const router = express.Router();

router.use("/:bookId/notes", noteRoutes);

router.get("/add", renderBookForm);
router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
