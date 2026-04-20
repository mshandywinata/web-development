import bcrypt from "bcrypt";
import { config } from "./configs/index.js";

// this is mutitude of based 2
// means that it double the time by every round
// 10-12 is more enough for a webapp scale
const SALT_ROUND = parseInt(config.saltRound);

export const getHashed = async (password) => {
  try {
    return await bcrypt.hash(password, SALT_ROUND);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const isMatch = async (entered, stored) => {
  try {
    return await bcrypt.compare(entered, stored);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
