import { config } from "./configs/index.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import router from "./routes.js";
import session from "express-session";
import passport from "passport";

import "./configs/passport.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use(
  session({
    name: "oauth_demo",
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

export default app;
