import prisma from "../lib/prisma.js";

const model = prisma.note;

export const getAllNoteEntries = async () => {
  return await model.findMany({
    orderBy: {
      [sortBy]: order,
    },
    include: {
      notes: true,
    },
  });
};

export const createNoteEntry = async (note) => {
  return await model.create({
    data: note,
  });
};

export const updateNoteEntryById = async (id, note) => {
  return await model.update({
    where: { id },
    data: note,
  });
};

export const deleteNoteEntryById = async (id) => {
  return await model.delete({
    where: { id },
  });
};
