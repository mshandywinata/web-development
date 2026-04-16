import {
  findAllBooks,
  findBookById,
  modifyBook,
  removeBook,
  saveBook,
} from "../services/bookService.js";

export const getAllBooks = async (req, res) => {
  try {
    const sortOption = req.query.sortBy || "created_at";
    const orderOption = req.query.orderBy || "desc";
    const books = await findAllBooks(sortOption, orderOption);

    res.render("index", {
      sortOption,
      orderOption,
      data: books,
    });
  } catch (error) {
    console.error(error);

    render("error", {
      status: 500,
      message: "Failed to fetch books.",
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await findBookById(id);

    res.render("notes", {
      title: book.title,
      data: book,
    });
  } catch (error) {
    console.error(error);

    render("error", {
      status: 500,
      message: "Failed to fetch book by id.",
    });
  }
};

export const renderBookForm = (req, res) => {
  res.render("add");
};

export const createBook = async (req, res) => {
  try {
    const book = {
      ...req.body,
      rating: parseInt(req.body.rating),
    };
    await saveBook(book);

    res.redirect("/");
  } catch (error) {
    console.error(error);

    render("error", {
      status: 500,
      message: "Failed to save new book.",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = req.body;
    await modifyBook(id, book);

    res.redirect("/");
  } catch (error) {
    console.error(error);

    render("error", {
      status: 500,
      message: "Failed to modify book.",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await removeBook(id);

    res.redirect("/");
  } catch (error) {
    console.error(error);

    render("error", {
      status: 500,
      message: "Failed to remove book.",
    });
  }
};
