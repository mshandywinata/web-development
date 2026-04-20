import { createUser, addSecret, findUser } from "./services.js";
import { getHashed } from "./utils.js";
// import passport from "passport";

export const getHome = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/secrets");
  } else {
    res.render("home");
  }
};

export const getRegister = (req, res) => {
  res.render("register");
};

export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await getHashed(password);
    const newUser = await createUser(email, hashedPassword);

    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      return res.redirect("/secrets");
    });
  } catch (err) {
    console.error(err);

    res.status(500).render("register", {
      message: "Failed to register new user.",
    });
  }
};

export const getLogin = (req, res) => {
  res.render("login");
};

export const getSecrets = async (req, res) => {
  if (req.isAuthenticated()) {
    const email = req.user.email;
    const { secret } = await findUser(email);

    res.render("secrets", { secret });
  } else {
    res.redirect("/login");
  }
};

export const getSubmit = (req, res) => {
  res.render("submit");
};

export const submitSecret = async (req, res) => {
  const email = req.user.email;
  const { secret } = req.body;

  try {
    await addSecret(email, secret);

    res.redirect("/secrets");
  } catch (err) {
    console.error(err);

    res.status(500).render("submit", {
      message: "Failed to submit a secret.",
    });
  }
};

export const logoutUser = async (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }

    res.redirect("/");
  });
};
