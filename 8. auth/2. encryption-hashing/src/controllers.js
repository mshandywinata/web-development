import { createUser, findUser } from "./services.js";
import { getHashed, isMatch } from "./utils.js";

export const getHome = (req, res) => {
  res.render("home");
};

export const getLogin = (req, res) => {
  res.render("login");
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUser(email);
    const loggedIn = await isMatch(password, user.password);

    if (!loggedIn) {
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    }

    res.render("secrets");
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to login user.",
    });
  }
};

export const getRegister = (req, res) => {
  res.render("register");
};

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await getHashed(password);

    await createUser(email, hashedPassword);

    res.redirect("/login");
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to register new user.",
    });
  }
};
