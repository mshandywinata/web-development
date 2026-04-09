import express from "express";
import morgan from "morgan";
import pg from "pg";

// basic db config
const db = new pg.Client({
  user: "mshandywinata",
  host: "localhost",
  database: "world",
  password: "mshandywinata",
  port: 5432,
});

db.connect();

db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  // always closed connection when query is done
  db.end();
});

const app = express();
const PORT = 3000;

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "successfull.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
