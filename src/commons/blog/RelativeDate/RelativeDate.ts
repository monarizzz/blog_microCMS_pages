import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";

const RelativeDate = (date: string): string => {
  const publishedDate = new Date(date);

  dayjs.extend(relativeTime);
  dayjs.locale(`ja`);
  const dateStr = dayjs(publishedDate).fromNow().toString();

  return dateStr;
};

export default RelativeDate;
