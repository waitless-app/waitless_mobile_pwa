import dayjs from "dayjs";

export const mergeArrayWithObject = (arr, obj) =>
  arr && arr.map((t) => (t.id === obj.id ? obj : t));

export const parseDate = (isoDate, format = "D MMM HH:mm") => {
  const date = dayjs(isoDate);
  return date.format(format);
};
