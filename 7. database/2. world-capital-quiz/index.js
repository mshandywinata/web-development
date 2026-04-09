import express from "express";
import morgan from "morgan";
import pg from "pg";
import axios from "axios";

const app = express();
const PORT = 3000;

const db = new pg.Client({
  user: "postgres",
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

  db.end();
});

app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// populate data if db is not available
let quiz = [
  { contry: "France", capital: "Paris" },
  { contry: "United Kingdom", capital: "London" },
  { contry: "United State of America", capital: "Washington DC" },
];
let totalCorrect = 0;
let currentQuestion = {};

const nextQuestion = async () => {
  const randomIndex = Math.floor(Math.random() * quiz.length);
  const randomQuestion = quiz[randomIndex];

  currentQuestion = randomQuestion;
};

app.get("/", async (req, res) => {
  totalCorrect = 0;

  await nextQuestion();
  console.log(currentQuestion);
  res.status(200).render("index.ejs", { question: currentQuestion });
});

app.post("/submit", async (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;

  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  await nextQuestion();
  res.status(200).render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

app.listen(PORT, () => {
  console.info(`Server running on: http://localhost:${PORT}`);
});
