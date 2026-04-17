import { createUser } from "./services.js";
import { getHashed } from "./utils.js";

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
        console.error("Session serialization failed after registration:", err);
        return next(err);
      }

      return res.redirect("/secrets");
    });
  } catch (error) {
    console.error(error);

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
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
};
