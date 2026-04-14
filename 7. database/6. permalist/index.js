import express from "express";
import morgan from "morgan";
import pg from "pg";

const app = express();
const PORT = 3000;

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  password: "mshandywinata",
  host: "localhost",
  port: 5432,
  database: "",
});

db.connect();

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.info(`Server running on: http://localhost:${PORT}`);
});
