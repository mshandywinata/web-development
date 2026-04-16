import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const getHashed = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const isMatch = async (entered, stored) => {
  return await bcrypt.compare(entered, stored);
};
