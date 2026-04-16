import prisma from "../lib/prisma.js";

export const findBookWithNotes = async (bookId) => {
  return await prisma.book.findUnique({
    where: { id: bookId },
    include: { notes: true },
  });
};

export const saveNote = async (bookId, content) => {
  return await prisma.note.create({
    data: {
      content,
      book: {
        connect: { id: bookId },
      },
    },
  });
};

export const modifyNote = async (id, bookId, content) => {
  return await prisma.note.updateMany({
    where: { id, bookId },
    data: { content },
  });
};

export const removeNote = async (id, bookId) => {
  return await prisma.note.deleteMany({
    where: { id, bookId },
  });
};
