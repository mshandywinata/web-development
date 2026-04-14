import prisma from "../lib/prisma.js";

const note = prisma.note;

export const getAllNoteEntries = async () => {
  return await note.findMany({
    orderBy: {
      [sortBy]: order,
    },
    include: {
      notes: true,
    },
  });
};

export const createNoteEntry = async (note) => {
  return await note.create({
    data: note,
  });
};

export const updateNoteEntryById = async (id, note) => {
  return await note.update({
    where: { id },
    data: note,
  });
};

export const deleteNoteEntryById = async (id) => {
  return await note.delete({
    where: { id },
  });
};
