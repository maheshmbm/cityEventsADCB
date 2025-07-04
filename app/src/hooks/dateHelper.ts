import { TFunction } from "i18next";

export const getFormattedDateTime = (
  dateStr: string,
  timeStr: string,
  t: TFunction,
  i18n: { language: string }
) => {
  try {
    const date = new Date(`${dateStr}T${timeStr}`);
    const formattedDate = new Intl.DateTimeFormat(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
    const formattedTime = new Intl.DateTimeFormat(i18n.language, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
    return t("events.when", {
      date: formattedDate,
      time: formattedTime,
    });
  } catch {
    return t("events.when", { date: dateStr, time: timeStr });
  }
};
