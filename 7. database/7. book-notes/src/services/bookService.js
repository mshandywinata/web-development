import prisma from "../lib/prisma.js";
import fetchCover from "../utils/fetchCover.js";

export const findAllBooks = async (sortBy, order) => {
  return await prisma.book.findMany({
    orderBy: { [sortBy]: order },
  });
};

export const findBookById = async (id) => {
  return await prisma.book.findUnique({
    where: { id },
    include: { notes: true },
  });
};

export const saveBook = async (book) => {
  const { isbn } = book;
  book.image_url = await fetchCover(isbn);

  return await prisma.book.create({
    data: book,
  });
};

export const modifyBook = async (id, book) => {
  return await prisma.book.update({
    where: { id },
    data: book,
  });
};

export const removeBook = async (id) => {
  return await prisma.book.delete({
    where: { id },
  });
};
