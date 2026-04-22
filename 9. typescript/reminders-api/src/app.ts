import express from "express";
import morgan from "morgan";
import reminderRoutes from "./routes/reminder.routes";

const app = express();

app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => {
  res.redirect("/api/reminders/all");
});

export default app;
