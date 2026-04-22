import prisma from "../lib/prisma";

export const findAllReminders = async () => {
  const reminders = await prisma.reminder.findMany();

  if (!reminders) {
    throw new Error("EmptyRemindersEntry");
  }

  return reminders;
};

export const findReminder = async (id: string) => {
  const targetReminder = await prisma.reminder.findUnique({
    where: { id },
  });

  if (!targetReminder) {
    throw Error("ReminderNotFound");
  }

  return targetReminder;
};

export const addReminder = async (title: string) => {
  const addedReminder = await prisma.reminder.create({
    data: { title },
  });

  return addedReminder;
};

export const modifyReminder = async (id: string, title: string) => {
  const modifiedReminder = await prisma.reminder.update({
    where: { id },
    data: { title },
  });

  if (!modifiedReminder) {
    throw Error("ReminderNotFound");
  }

  return modifiedReminder;
};

export const removeReminder = async (id: string) => {
  const removedReminder = await prisma.reminder.delete({
    where: { id },
  });

  if (!removeReminder) {
    throw Error("ReminderNotFound");
  }

  return removedReminder;
};

export const removeAllReminders = async () => {
  const isRemoved = await prisma.reminder.deleteMany();

  if (!isRemoved) {
    throw new Error("EmptyRemindersEntry");
  }

  return isRemoved;
};
