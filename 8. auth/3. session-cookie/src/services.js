import prisma from "./lib/prisma.js";

// if the none of the model's method stated as defined
// big chances are the client instance is cached inside the node_modules
// then is recommended to print out the Object.keys(prisma) and lookup for defined models
// if there are none, reinstall all prisma dependencies via npm i
// and finally apply the schema by re-generate via npx prisma generate

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
