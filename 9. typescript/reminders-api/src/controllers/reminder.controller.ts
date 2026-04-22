import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/response";
import {
  findAllReminders,
  findReminder,
  addReminder,
  modifyReminder,
  removeReminder,
  removeAllReminders,
} from "../services/reminder.service";

export const getAllReminders = async (req: Request, res: Response) => {
  try {
    const data = await findAllReminders();
    sendSuccess(res, data);
  } catch (err) {
    sendError(res);
  }
};

export const getReminderById = async (req: Request, res: Response) => {
  const id = req.params.id.toString();

  try {
    const data = await findReminder(id);

    sendSuccess(res, data);
  } catch (err) {
    sendError(res);
  }
};

export const createReminder = async (req: Request, res: Response) => {
  const title = req.body.title;

  try {
    const data = await addReminder(title);
    sendSuccess(res, data);
  } catch (err) {
    sendError(res);
  }
};

export const updateReminder = async (req: Request, res: Response) => {
  const title = req.body.title;
  const id = req.params.id.toString();

  try {
    const data = await modifyReminder(id, title);
    sendSuccess(res, data);
  } catch (err) {
    sendError(res);
  }
};

export const deleteReminderById = async (req: Request, res: Response) => {
  const id = req.params.id.toString();

  try {
    const data = await removeReminder(id);
    sendSuccess(res, data);
  } catch (err) {
    sendError(res);
  }
};

export const deleteAllReminders = async (req: Request, res: Response) => {
  try {
    const data = await removeAllReminders();
    sendSuccess(res, data);
  } catch (err) {
    sendError(res);
  }
};
