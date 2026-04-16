import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router({ mergeParams: true });

router.get("/", getAllNotes);
router.post("/", createNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
