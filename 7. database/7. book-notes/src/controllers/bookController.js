import prisma from "../lib/prisma.js";

const model = prisma.book;

export const getAllBookEntries = async (
  sortBy = "created_at",
  order = "desc",
) => {
  return await model.findMany({
    orderBy: {
      [sortBy]: order,
    },
    include: {
      notes: true,
    },
  });
};

export const getBookEntryById = async (id) => {
  return await model.findUnique({
    where: { id: parseInt(id) },
  });
};

export const createBookEntry = async (book) => {
  return await model.create({
    data: book,
  });
};

export const updateBookEntryById = async (id, book) => {
  return await model.update({
    where: { id },
    data: book,
  });
};

export const deleteBookEntryById = async (id) => {
  return await model.delete({
    where: { id },
  });
};
