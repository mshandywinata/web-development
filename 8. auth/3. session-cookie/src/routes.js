import express from "express";
import {
  getHome,
  getLogin,
  getRegister,
  registerUser,
  getSecrets,
} from "./controllers.js";
import passport from "passport";

const router = express.Router();

router.get("/", getHome);
router.get("/login", getLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  }),
);

router.get("/register", getRegister);
router.post("/register", registerUser);
router.get("/secrets", getSecrets);

export default router;
