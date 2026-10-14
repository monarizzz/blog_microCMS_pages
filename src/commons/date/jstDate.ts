// microCMS の日付は JST 0 時を UTC で返す（例: 2024-10-05 → "2024-10-04T15:00:00.000Z"）。
// 文字列を slice すると月初の日付が前月にずれるため、JST に直してから年月を取る
const yearMonthFormat = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
});

const toJstParts = (iso: string) => {
  const parts = yearMonthFormat.formatToParts(new Date(iso));
  return {
    year: parts.find((part) => part.type === "year")?.value ?? "",
    month: parts.find((part) => part.type === "month")?.value ?? "",
  };
};

/** ISO 日時を JST の `YYYY.MM` にする */
export const toJstYearMonth = (iso: string) => {
  const { year, month } = toJstParts(iso);
  return `${year}.${month}`;
};

/** ISO 日時を JST の `YYYY` にする */
export const toJstYear = (iso: string) => toJstParts(iso).year;

const dateFormat = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** ISO 日時を JST の `YYYY.MM.DD` にする */
export const toJstDate = (iso: string) => {
  const parts = dateFormat.formatToParts(new Date(iso));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}.${get("month")}.${get("day")}`;
};
