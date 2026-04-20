import express from "express";
import {
  getHome,
  getLogin,
  getRegister,
  registerUser,
  getSecrets,
  getSubmit,
  logoutUser,
  submitSecret,
} from "./controllers.js";
import passport from "passport";

const router = express.Router();

router.get("/", getHome);
router.get("/login", getLogin);
// handled by passport
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  }),
);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);
router.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  }),
);
router.get("/register", getRegister);
router.post("/register", registerUser);
router.get("/secrets", getSecrets);
router.get("/submit", getSubmit);
router.post("/submit", submitSecret);
router.get("/logout", logoutUser);

export default router;
