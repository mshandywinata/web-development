import express from "express";
import morgan from "morgan";
import pg from "pg";

const app = express();
const PORT = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "mshandywinata",
  host: "localhost",
  database: "world",
  port: 5432,
});

db.connect();

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const getVisited = async (id) => {
  try {
    const { rows } = await db.query(
      "SELECT country_code, user_id FROM visited AS v JOIN users AS u ON u.id = v.user_id WHERE v.user_id = $1",
      [id],
    );

    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUsers = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM users");

    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addUser = async (name, color) => {
  try {
    const { rows } = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *",
      [name, color],
    );

    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addVisited = async (userId, countryName) => {
  try {
    const codes = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [countryName],
    );

    try {
      const { rows } = await db.query(
        "INSERT INTO visited (country_code, user_id) VALUES ($1, $2) RETURNING *",
        [codes.rows[0].country_code, userId],
      );

      return rows;
    } catch (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

let currentUserId;

app.get("/", async (req, res) => {
  try {
    const users = await getUsers();

    if (!currentUserId && users.length > 0) {
      currentUserId = users[0].id;
    }

    const currentUser = users.find((user) => user.id == currentUserId);
    const countries = await getVisited(currentUserId);
    const country_codes = countries.map((country) => country.country_code);

    console.log(currentUserId);
    console.log(currentUser);
    console.log(country_codes);

    res.render("index.ejs", {
      users,
      color: currentUser.color,
      total: countries.length,
      countries: country_codes,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/user", (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const { name, color } = req.body;

  try {
    const inserted = await addUser(name, color);
    console.log(inserted);
    currentUserId = inserted[0].id;
  } catch (error) {
    console.error(error.message);
  }

  res.redirect("/");
});

app.post("/add", async (req, res) => {
  const { country } = req.body;
  const countryInput = country.trim().toLowerCase();

  try {
    const inserted = await addVisited(currentUserId, countryInput);
    console.log(inserted);
    currentUserId = inserted[0].user_id;
  } catch (error) {
    console.error(error.message);
  }

  res.redirect("/");
});

app.listen(PORT, (req, res) => {
  console.info(`Server running on: http://localhost:${PORT}`);
});
