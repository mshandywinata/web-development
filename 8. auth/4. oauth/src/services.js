import prisma from "./lib/prisma.js";

export const findUser = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (email, password = null, googleId = null) => {
  return await prisma.user.create({
    data: { email, password, googleId },
  });
};

export const findGoogle = async (profile) => {
  return await prisma.user.findUnique({
    where: {
      googleId: profile.id,
    },
  });
};

export const createGoogle = async (profile) => {
  return await prisma.user.create({
    data: {
      email: profile.email,
      googleId: profile.id,
    },
  });
};

export const linkGoogle = async (profile) => {
  return await prisma.user.update({
    where: {
      email: profile.email,
    },
    data: {
      googleId: profile.id,
    },
  });
};

export const addSecret = async (email, secret) => {
  return await prisma.user.update({
    where: { email },
    data: { secret },
  });
};
