import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";

dayjs.extend(relativeTime);
dayjs.locale(`ja`);

const relativeDate = (date: string) => {
  return dayjs(date).fromNow();
};

export default relativeDate;
