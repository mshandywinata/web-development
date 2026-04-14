import express from "express";
import {
  createBookEntry,
  deleteBookEntryById,
  getAllBookEntries,
  updateBookEntryById,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/book", getAllBookEntries);
router.post("/new", createBookEntry);
router.patch("/book/:id", updateBookEntryById);
router.delete("/book/:id", deleteBookEntryById);

export default router;
