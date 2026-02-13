import { test, expect } from "vitest";
import limitText from "./limitText";

const mocTextJp = "これはテストのテキストです"; // 13文字
const mocTextEN = "this is a test text"; // 19文字
const add = "...";

/* 日本語 */
test("全角：textとmaxLengthが同じ場合", () => {
  expect(limitText(mocTextJp, 13)).toBe(mocTextJp);
});

test("全角：textがmaxLengthより1文字少ない", () => {
  expect(limitText("これはテストのテキストで", 13)).toBe(
    "これはテストのテキストで",
  );
});

test("全角：textがmaxLengthより1文字多い", () => {
  expect(limitText("これはテストのテキストです！", 13)).toBe(
    `${mocTextJp}${add}`,
  );
});

/* 英語 */
test("半角：textとmaxLengthが同じ場合", () => {
  expect(limitText(mocTextEN, 19)).toBe(mocTextEN);
});

test("半角：textがmaxLengthより1文字少ない", () => {
  expect(limitText("this is a test tex", 19)).toBe("this is a test tex");
});

test("半角：textがmaxLengthより1文字多い", () => {
  expect(limitText("this is a test text!", 19)).toBe(`${mocTextEN}${add}`);
});

/* その他 */
test("text,空文字列(maxLengthなし)", () => {
  expect(limitText("")).toBe("");
});

test("text,空文字列(maxLengthあり)", () => {
  expect(limitText("", 3)).toBe("");
});

test("maxLengthなし", () => {
  expect(limitText(mocTextJp)).toBe(mocTextJp);
});

test("maxLengthがunifiedの場合", () => {
  expect(limitText(mocTextJp, undefined)).toBe(mocTextJp);
});
