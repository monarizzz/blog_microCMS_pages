import { test, expect } from "vitest";
import getPlainText from "./getPlainText";

test("HTMLタグを除去してテキストのみ返す", () => {
  expect(getPlainText("<p>これはテストのテキストです</p>")).toBe(
    "これはテストのテキストです",
  );
});

test("brタグがスペースに置換される", () => {
  expect(getPlainText("これはテストの<br>テキストです")).toBe(
    "これはテストの テキストです",
  );
});

test("ブロック要素間がスペースで区切られる", () => {
  expect(getPlainText("<p>これはテストの</p><p>テキストです</p>")).toBe(
    "これはテストの テキストです",
  );
});

test("連続する空白が1つに正規化される", () => {
  expect(getPlainText("<p>あ</p><p></p><p>い</p>")).toBe("あ い");
});

test("前後の空白が除去される", () => {
  expect(getPlainText("<p> テスト </p>")).toBe("テスト");
});

test("150文字以上のテキストは150文字で切り詰められる", () => {
  const longText = `<p>${"あ".repeat(200)}</p>`;
  expect(getPlainText(longText).length).toBe(150);
});

test("150文字未満のテキストはそのまま返される", () => {
  const shortText = `<p>${"あ".repeat(100)}</p>`;
  expect(getPlainText(shortText).length).toBe(100);
});

test("空文字列を渡すと空文字列を返す", () => {
  expect(getPlainText("")).toBe("");
});

test("ネストしたタグのテキストが結合される", () => {
  expect(getPlainText("<p><strong>太字</strong>テスト</p>")).toBe("太字テスト");
});
