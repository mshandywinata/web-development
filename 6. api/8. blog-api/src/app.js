import express from "express";
import morgan from "morgan";
import router from "./routes/routes.js";

const app = express();

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

export default app;