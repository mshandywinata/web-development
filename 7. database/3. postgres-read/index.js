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

// for demonstration purpose
// these values left as a global variable
let flags = [];
let currentQuestion = {};
let currentScore = 0;

db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.error("Error executing query ", err.stack);
  } else {
    flags = res.rows;
  }

  db.end();
});

// after submit the currentQuestion going to be empty
// hence async function is needed for this helper to populate the value
const getQuestion = async () => {
  const randomIndex = Math.floor(Math.random() * flags.length);
  currentQuestion = flags[randomIndex];
};

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  currentScore = 0;
  await getQuestion();

  console.log(`[QUESTION]: ${currentQuestion.name}`);
  console.log(`[SCORE]: ${currentScore}`);

  res.status(200).render("index.ejs", { question: currentQuestion });
});

app.post("/submit", async (req, res) => {
  const { answer } = req.body;
  const inputAnswer = answer.trim().toLowerCase();
  const trueAnswer = currentQuestion.name.toLowerCase();

  let isCorrect = false;

  if (inputAnswer === trueAnswer) {
    currentScore++;
    isCorrect = true;
  }

  await getQuestion();

  console.log(`[QUESTION]: ${currentQuestion.name}`);
  console.log(`[SCORE]: ${currentScore}`);

  res.status(200).render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: currentScore,
  });
});

app.listen(PORT, () => {
  console.info(`Server running on: http://localhost:${PORT}`);
});
