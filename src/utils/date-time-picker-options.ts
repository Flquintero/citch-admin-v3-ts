import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const dateTimePickerPresets = {
  date: {
    format: "YYYY-MM-DD",
    formatted: "YYYY-MM-DD",
    outputFormat: "YYYY-MM-DD",
    noLabel: true,
    autoClose: true,
    onlyDate: true,
    overlay: true,
    label: "Date",
    color: "#0075ff",
    noClearButton: true,
    class: "citch-date-picker",
    noButtonNow: true,
    minDate: dayjs.utc().format("YYYY-MM-DD"),
  },
  time: {
    format: "hh:mm a",
    formatted: "hh:mm a",
    outputFormat: "hh:mm a",
    noLabel: true,
    onlyTime: true,
    label: "Time",
    color: "#0075ff",
    noClearButton: true,
    class: "citch-date-picker",
    noButtonNow: true,
  },
};
