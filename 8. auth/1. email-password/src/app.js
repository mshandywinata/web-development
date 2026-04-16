import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", router);

export default app;
