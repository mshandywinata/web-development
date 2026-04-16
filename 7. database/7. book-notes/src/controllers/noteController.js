import {
  findBookWithNotes,
  modifyNote,
  removeNote,
  saveNote,
} from "../services/noteService.js";

export const getAllNotes = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId);
    const bookWithNotes = await findBookWithNotes(bookId);

    res.render("notes", { data: bookWithNotes });
  } catch (error) {
    console.error(error);

    render("error", {
      status: 500,
      message: "Failed to fetch all notes.",
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId);
    const { content } = req.body;

    await saveNote(bookId, content);

    res.redirect(`/books/${bookId}`);
  } catch (error) {
    console.error(error);

    render("error", {
      status: 500,
      message: "Failed to save new note.",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const bookId = parseInt(req.params.bookId);
    const { content } = req.body;
    await modifyNote(id, bookId, content);

    res.redirect(`/books/${bookId}`);
  } catch (error) {
    console.error(error);

    render("error", {
      status: 500,
      message: "Failed to modify note.",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const bookId = parseInt(req.params.bookId);

    removeNote(id, bookId);

    res.redirect(`/books/${bookId}`);
  } catch (error) {
    console.error(error);

    render("error", {
      status: 500,
      message: "Failed to remove note.",
    });
  }
};
