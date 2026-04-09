import express from "express";
import axios from "axios";
import morgan from "morgan";
import pg from "pg";

const app = express();
const PORT = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "mshandywinata",
  host: "localhost",
  port: 5432,
  database: "world",
});

db.connect();

let flags = [];

db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.error("Error executing query ", err.stack);
  } else {
    flags = res.rows;
  }

  db.end();
});

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.info(`Server running on: http://localhost:${PORT}`);
});
