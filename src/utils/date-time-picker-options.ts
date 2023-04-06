import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const dateTimePickerPresets = {
  date: {
    enableTime: true,
    formatDate: function (date: any) {
      return dayjs(date).format("MMM D, YYYY hh:mm a");
    },
    minDate: dayjs.utc().format("YYYY-MM-DD"),
    altFormat: function (date: any) {
      return dayjs(date).utc();
    },
    altInput: true,
  },
};
