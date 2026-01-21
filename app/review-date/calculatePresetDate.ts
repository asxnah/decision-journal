import { getTodayISO } from "@lib/getTodayISO";

export const calculatePresetDate = (months: number) => {
  const date = new Date(getTodayISO());
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split("T")[0];
};
