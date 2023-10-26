import dayjs from "dayjs";

export const validateTime = (time: string) => {
  return dayjs(formatDateHour(time)).isValid();
};

export const formatDateHour = (time: string) => {
  const date = dayjs().format("YYYY-MM-DD");
  const dateTimeFormat = new Date(`${date} ${time}`);

  return dayjs(dateTimeFormat);
};

export const compareEndTimeIsAfter = (startTime: string, endTime: string) => {
  return formatDateHour(endTime).isAfter(formatDateHour(startTime));
};
