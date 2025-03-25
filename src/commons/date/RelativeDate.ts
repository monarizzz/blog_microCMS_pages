import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function RelativeDate(date: Date): string {
  dayjs.extend(relativeTime);
  dayjs.locale(`ja`);
  return dayjs(date).fromNow();
}
