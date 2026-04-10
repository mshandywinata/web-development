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
  database: "world",
});

db.connect();

const getVisited = async () => {
  const { rows } = await db.query("SELECT country_code FROM visited");
  return rows.map((country) => country.country_code);
};

app.get("/", async (req, res) => {
  const countryCodes = await getVisited();

  res.render("index.ejs", {
    countries: countryCodes,
    total: countryCodes.length,
  });
});

app.post("/add", async (req, res) => {
  const { country } = req.body;
  const inputCountry = country.trim().toLowerCase();
  const countryCodes = await getVisited();

  try {
    const result = await db.query(
      `SELECT country_code FROM countries WHERE LOWER(country_name) = '${inputCountry}'`,
    );
    const targetRow = result.rows[0];
    const countryCode = targetRow.country_code;

    try {
      await db.query(
        `INSERT INTO visited (country_code) VALUES ('${countryCode}')`,
      );
    } catch (error) {
      console.error(error.message);

      return res.render("index.ejs", {
        countries: countryCodes,
        total: countryCodes.length,
        error: "Country has been added, try another country.",
      });
    }
  } catch (error) {
    console.error(error.message);

    return res.render("index.ejs", {
      countries: countryCodes,
      total: countryCodes.length,
      error: "Country name does not exist, try again.",
    });
  }

  res.redirect("/");
});

app.listen(PORT, () => {
  console.info(`Server running on: http://localhost:${PORT}`);
});
