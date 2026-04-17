import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export const getHashed = async (password) => {
  try {
    return await bcrypt.hash(password, SALT_ROUND);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const isMatch = async (entered, stored) => {
  try {
    return await bcrypt.compare(entered, stored);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
