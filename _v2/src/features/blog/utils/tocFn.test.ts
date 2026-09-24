import { test, expect } from "vitest";
import tocFn from "./tocFn";

/* 正常系 */
test("h1, h2, h3のtext・idが取得できる", () => {
  const html = `
    <h1 id="h1">見出し1</h1>
    <h2 id="h2">見出し2</h2>
    <h3 id="h3">見出し3</h3>
  `;
  expect(tocFn(html)).toEqual([
    { text: "見出し1", id: "h1" },
    { text: "見出し2", id: "h2" },
    { text: "見出し3", id: "h3" },
  ]);
});

test("h2のみのHTML", () => {
  const html = `<h2 id="h2">見出し2</h2>`;
  expect(tocFn(html)).toEqual([{ text: "見出し2", id: "h2" }]);
});

test("ネストされた要素を含む見出し", () => {
  const html = `<h2 id="h2"><strong>太字の見出し</strong></h2>`;
  expect(tocFn(html)).toEqual([{ text: "太字の見出し", id: "h2" }]);
});

/* 境界値 */
test("見出しがないHTML", () => {
  const html = `<p>本文テキスト</p>`;
  expect(tocFn(html)).toEqual([]);
});

test("空文字列", () => {
  expect(tocFn("")).toEqual([]);
});

test("h4, h5, h6のみのHTML", () => {
  const html = `
    <h4 id="h4">見出し4</h4>
    <h5 id="h5">見出し5</h5>
    <h6 id="h6">見出し6</h6>
  `;
  expect(tocFn(html)).toEqual([]);
});
