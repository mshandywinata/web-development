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
  database: "list",
});

db.connect();

const getListItems = async () => {
  try {
    const { rows } = await db.query("SELECT id, title FROM items");
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addListItem = async (title) => {
  try {
    const added = await db.query("INSERT INTO items (title) VALUES ($1)", [
      title,
    ]);
    return added;
  } catch (error) {
    throw new Error(error.message);
  }
};

const editListItem = async (id, title) => {
  try {
    const edited = await db.query("UPDATE items SET title = $1 WHERE id = $2", [
      title,
      id,
    ]);
    return edited;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteListItem = async (id) => {
  try {
    const deleted = await db.query("DELETE FROM items WHERE id = $1", [id]);
    return deleted;
  } catch (error) {
    throw new Error(error.message);
  }
};

app.get("/", async (req, res) => {
  try {
    const items = await getListItems();

    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/add", async (req, res) => {
  const { newItem } = req.body;
  const inputTitle = newItem.trim();

  try {
    await addListItem(inputTitle);
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/edit", async (req, res) => {
  const { updatedItemId, updatedItemTitle } = req.body;

  try {
    await editListItem(updatedItemId, updatedItemTitle);
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/delete", async (req, res) => {
  const { deleteItemId } = req.body;

  try {
    await deleteListItem(deleteItemId);
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.info(`Server running on: http://localhost:${PORT}`);
});
