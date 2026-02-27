import { test, expect } from "vitest";
import pageNavList from "./pageNavList";
import { Blog } from "@/libs/schema/contents/Blog/blog";

const createBlog = (id: string, title: string): Blog => ({
  id,
  title,
  body: "",
  categories: [],
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  revisedAt: "",
  development_env: ["dev"],
});

const blogs: Blog[] = [
  createBlog("1", "記事1"),
  createBlog("2", "記事2"),
  createBlog("3", "記事3"),
];

/* 正常系 */
test("中間の記事：backBlogとnextBlogの両方が返る", () => {
  expect(pageNavList(blogs, "2")).toEqual({
    backBlog: { id: "1", title: "記事1" },
    nextBlog: { id: "3", title: "記事3" },
  });
});

test("先頭の記事：backBlogがnull", () => {
  expect(pageNavList(blogs, "1")).toEqual({
    backBlog: null,
    nextBlog: { id: "2", title: "記事2" },
  });
});

test("末尾の記事：nextBlogがnull", () => {
  expect(pageNavList(blogs, "3")).toEqual({
    backBlog: { id: "2", title: "記事2" },
    nextBlog: null,
  });
});

/* 境界値 */
test("記事が1件のみ：両方null", () => {
  const single = [createBlog("1", "記事1")];
  expect(pageNavList(single, "1")).toEqual({
    backBlog: null,
    nextBlog: null,
  });
});

test("記事が2件で先頭を指定", () => {
  const two = [createBlog("1", "記事1"), createBlog("2", "記事2")];
  expect(pageNavList(two, "1")).toEqual({
    backBlog: null,
    nextBlog: { id: "2", title: "記事2" },
  });
});

test("記事が2件で末尾を指定", () => {
  const two = [createBlog("1", "記事1"), createBlog("2", "記事2")];
  expect(pageNavList(two, "2")).toEqual({
    backBlog: { id: "1", title: "記事1" },
    nextBlog: null,
  });
});

/* 異常系 */
test("存在しないidを指定", () => {
  expect(pageNavList(blogs, "999")).toEqual({
    backBlog: null,
    nextBlog: null,
  });
});

test("idがundefined", () => {
  expect(pageNavList(blogs, undefined)).toEqual({
    backBlog: null,
    nextBlog: null,
  });
});

test("blogsが空配列", () => {
  expect(pageNavList([], "1")).toEqual({
    backBlog: null,
    nextBlog: null,
  });
});
