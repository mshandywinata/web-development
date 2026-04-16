import prisma from "./lib/prisma.js";

export const findUser = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (email, password) => {
  return await prisma.user.create({
    data: { email, password },
  });
};
