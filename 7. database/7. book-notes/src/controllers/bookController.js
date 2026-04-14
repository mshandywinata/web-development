import prisma from "../lib/prisma.js";

const book = prisma.book;

export const getAllBookEntries = async (
  sortBy = "created_at",
  order = "desc",
) => {
  return await book.findMany({
    orderBy: {
      [sortBy]: order,
    },
    include: {
      notes: true,
    },
  });
};

export const getBookEntryById = async (id) => {
  return await book.findUnique({
    where: { id: parseInt(id) },
  });
};

export const createBookEntry = async (book) => {
  return await book.create({
    data: book,
  });
};

export const updateBookEntryById = async (id, book) => {
  return await book.update({
    where: { id },
    data: book,
  });
};

export const deleteBookEntryById = async (id) => {
  return await book.delete({
    where: { id },
  });
};
