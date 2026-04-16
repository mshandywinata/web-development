import express from "express";
import {
  getHome,
  getLogin,
  loginUser,
  getRegister,
  registerUser,
} from "./controllers.js";

const router = express.Router();

router.get("/", getHome);
router.get("/login", getLogin);
router.post("/login", loginUser);
router.get("/register", getRegister);
router.post("/register", registerUser);

export default router;
