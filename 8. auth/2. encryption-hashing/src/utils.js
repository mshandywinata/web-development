import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const getHashed = (password) => {
  return bcrypt.hashSync(password, SALT_ROUNDS);
};

export const isMatch = async (entered, stored) => {
  return bcrypt.compareSync(entered, stored);
};
