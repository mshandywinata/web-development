import {
  findAllNotes,
  modifyNote,
  removeNote,
  saveNote,
} from "../services/noteService.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await findAllNotes();

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all notes." });
  }
};

export const createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const createdNote = await saveNote(content);

    res.json(createdNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to save new note." });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;
    const updatedNote = await modifyNote(id, content);

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to modify note." });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await removeNote(id);

    res.json(deletedNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove note." });
  }
};
