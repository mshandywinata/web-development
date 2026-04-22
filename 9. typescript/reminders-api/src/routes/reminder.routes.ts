import { Router } from "express";
import {
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminderById,
  deleteAllReminders,
} from "../controllers/reminder.controller";

const router = Router();

router.get("/all", getAllReminders);
router.delete("/all", deleteAllReminders);
router.get("/:id", getReminderById);
router.post("/", createReminder);
router.patch("/:id", updateReminder);
router.delete("/:id", deleteReminderById);

export default router;
