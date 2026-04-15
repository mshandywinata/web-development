import {
  findAllBooks,
  findBookById,
  modifyBook,
  removeBook,
  saveBook,
} from "../services/bookService.js";

export const getAllBooks = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "created_at";
    const order = req.query.order || "desc";
    const books = await findAllBooks(sortBy, order);

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books." });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await findBookById(parseInt(id));

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch book by id." });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = req.body;
    const createdBook = await saveBook(book);

    res.json(createdBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to save new book." });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = req.body;
    const updatedBook = await modifyBook(id, book);

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to modify book." });
  }
};

export const deleteBook = async (id) => {
  try {
    const { id } = req.params;
    const deletedBook = await removeBook(id);

    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove book." });
  }
};
