import { load, type Cheerio, type CheerioAPI } from "cheerio";

import type { ArticleBlock, ArticleListItem } from "./types/articleBlock";
import type { ArticleInline, InlineMark } from "./types/articleInline";

/** cheerio が返すノード 1 つ。domhandler に直接依存しないよう cheerio の型から取り出す */
type NodeOf<C> = C extends Cheerio<infer T> ? T : never;
type HtmlNode = NodeOf<ReturnType<ReturnType<CheerioAPI["root"]>["contents"]>>;
type HtmlElement = Extract<HtmlNode, { tagName: string }>;

/** 段落の区切りになる要素。これ以外のタグは文字装飾（インライン）として扱う */
const BLOCK_TAGS = new Set([
  "p",
  "div",
  "section",
  "article",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "pre",
  "blockquote",
  "figure",
  "figcaption",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "hr",
  "img",
  "iframe",
  "script",
  "style",
  "noscript",
  "object",
  "embed",
  "video",
  "audio",
]);

/**
 * 中身ごと捨てる要素。iframe（埋め込み）は任意のページを本文に差し込めてしまうため、
 * 許可するホストを決めるまでは描かない。script / style は文字が本文に混ざるのを防ぐ
 */
const DROPPED_TAGS = new Set([
  "iframe",
  "script",
  "style",
  "noscript",
  "object",
  "embed",
  "video",
  "audio",
]);

const MARK_BY_TAG: Record<string, InlineMark> = {
  strong: "bold",
  b: "bold",
  em: "italic",
  i: "italic",
  s: "strike",
  del: "strike",
  strike: "strike",
  u: "underline",
  code: "code",
};

const isElement = (node: HtmlNode): node is HtmlElement => "tagName" in node;

const isBlockElement = (node: HtmlNode): node is HtmlElement =>
  isElement(node) && BLOCK_TAGS.has(node.tagName);

const HEADING_PATTERN = /^h([1-6])$/;

/**
 * リンク先として通すのは http(s) / mailto とサイト内（`/` `#` 始まり）だけ。
 * `javascript:` などを href に入れると、クリックでスクリプトが走るため
 */
const sanitizeHref = (href: string | undefined) => {
  const value = href?.trim();
  if (!value) return undefined;
  return /^(https?:|mailto:)/i.test(value) || /^[/#]/.test(value)
    ? value
    : undefined;
};

/** 画像は http(s) の URL だけ通す（`data:` などで任意の内容を描かせない） */
const sanitizeImageSrc = (src: string | undefined) => {
  const value = src?.trim();
  return value && /^https?:\/\//i.test(value) ? value : undefined;
};

const toPositiveInt = (value: string | undefined) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
};

/** 同じ装飾・同じリンク先の区間か */
const isSameStyle = (a: ArticleInline, b: ArticleInline) =>
  a.href === b.href &&
  (a.marks ?? []).length === (b.marks ?? []).length &&
  (a.marks ?? []).every((mark) => b.marks?.includes(mark));

/** 隣り合う同じ装飾の区間をつなぎ、両端の空白と改行を落とす */
const normalizeInlines = (segments: ArticleInline[]) => {
  const merged: ArticleInline[] = [];
  for (const segment of segments) {
    if (segment.text === "") continue;
    const last = merged.at(-1);
    if (last && isSameStyle(last, segment)) {
      last.text += segment.text;
    } else {
      merged.push({ ...segment });
    }
  }

  while (merged.length > 0) {
    merged[0].text = merged[0].text.replace(/^\s+/, "");
    if (merged[0].text !== "") break;
    merged.shift();
  }
  while (merged.length > 0) {
    const last = merged[merged.length - 1];
    last.text = last.text.replace(/\s+$/, "");
    if (last.text !== "") break;
    merged.pop();
  }

  return merged;
};

const hasText = (segments: ArticleInline[]) =>
  segments.some((segment) => segment.text.trim() !== "");

type Style = { marks: InlineMark[]; href?: string };

const toSegment = (text: string, { marks, href }: Style): ArticleInline => ({
  text,
  ...(marks.length > 0 ? { marks } : {}),
  ...(href ? { href } : {}),
});

/**
 * ノード列を本文の区間にする（正規化前）。
 * 中に段落などのブロック要素が来たら（引用内の複数段落、表のセル内の <p> など）、
 * ブロックの境目を改行にして 1 続きの文にする
 */
const collectInlines = (
  $: CheerioAPI,
  nodes: HtmlNode[],
  style: Style,
): ArticleInline[] => {
  const segments: ArticleInline[] = [];
  let breakBeforeNext = false;

  const append = (inner: ArticleInline[], isBlock: boolean) => {
    if (isBlock) {
      const trimmed = normalizeInlines(inner);
      if (trimmed.length === 0) return;
      if (hasText(segments)) segments.push(toSegment("\n", style));
      segments.push(...trimmed);
      breakBeforeNext = true;
      return;
    }
    if (inner.length === 0) return;
    if (breakBeforeNext && hasText(inner)) {
      segments.push(toSegment("\n", style));
      breakBeforeNext = false;
    }
    segments.push(...inner);
  };

  for (const node of nodes) {
    if (node.type === "text") {
      // HTML では改行は空白として描かれる。本文の改行は <br> だけが表す
      append(
        [toSegment(node.data.replace(/[ \t\r]*\n[ \t\r\n]*/g, " "), style)],
        false,
      );
      continue;
    }
    if (!isElement(node) || DROPPED_TAGS.has(node.tagName)) continue;

    const tag = node.tagName;
    if (tag === "br") {
      append([toSegment("\n", style)], false);
      continue;
    }
    if (tag === "img") continue;

    const mark = MARK_BY_TAG[tag];
    const innerStyle: Style = {
      marks:
        mark && !style.marks.includes(mark)
          ? [...style.marks, mark]
          : style.marks,
      href: tag === "a" ? sanitizeHref(node.attribs.href) : style.href,
    };
    append(
      collectInlines($, $(node).contents().toArray(), innerStyle),
      BLOCK_TAGS.has(tag),
    );
  }

  return segments;
};

const toInlines = ($: CheerioAPI, nodes: HtmlNode[]) =>
  normalizeInlines(collectInlines($, nodes, { marks: [] }));

type Context = {
  $: CheerioAPI;
  /** 記事内で最も浅い見出しの段。これを節 (heading2)、より深いものを小見出し (heading3) にする */
  sectionLevel: number;
  usedIds: Set<string>;
};

/** アンカーに使う id。リッチエディタが振った id を使い、無い・重複するときは連番で補う */
const resolveHeadingId = (context: Context, id: string | undefined) => {
  let resolved =
    id && /^[A-Za-z][\w-]*$/.test(id) && !context.usedIds.has(id)
      ? id
      : undefined;
  for (let index = 1; !resolved; index += 1) {
    const candidate = `heading-${index}`;
    if (!context.usedIds.has(candidate)) resolved = candidate;
  }
  context.usedIds.add(resolved);
  return resolved;
};

/**
 * 段落全体が `span.callout` に入っているか。
 * 旧ブログはリッチエディタのカスタムクラス `callout` で囲みを表していた
 */
const isCalloutParagraph = ($: CheerioAPI, element: HtmlElement) => {
  const $paragraph = $(element);
  if ($paragraph.find("span.callout").length === 0) return false;
  const $rest = $paragraph.clone();
  $rest.find("span.callout").remove();
  return $rest.text().trim() === "";
};

const toCodeBlock = (
  $: CheerioAPI,
  pre: HtmlElement,
  filename?: string,
): ArticleBlock => {
  const $pre = $(pre);
  const className = `${$pre.children("code").attr("class") ?? ""} ${$pre.attr("class") ?? ""}`;
  const language = /(?:^|\s)language-([\w#+-]+)/.exec(className)?.[1];
  return {
    type: "code",
    ...(language ? { language } : {}),
    ...(filename ? { filename } : {}),
    code: $pre.text(),
  };
};

const toListItem = (context: Context, li: HtmlNode): ArticleListItem => {
  const blocks = convertNodes(context, context.$(li).contents().toArray());
  const [first, ...rest] = blocks;
  if (first?.type === "paragraph") {
    return rest.length > 0
      ? { content: first.content, children: rest }
      : { content: first.content };
  }
  return { content: [], children: blocks };
};

const toImageBlock = (
  $: CheerioAPI,
  img: HtmlElement,
  caption?: string,
): ArticleBlock | undefined => {
  const src = sanitizeImageSrc(img.attribs.src);
  if (!src) return undefined;
  const width = toPositiveInt(img.attribs.width);
  const height = toPositiveInt(img.attribs.height);
  return {
    type: "image",
    src,
    alt: img.attribs.alt ?? "",
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(caption ? { caption } : {}),
  };
};

const toTableBlock = ($: CheerioAPI, table: HtmlElement): ArticleBlock => {
  const rows = $(table)
    .find("tr")
    .toArray()
    .map((tr) => $(tr).children("th, td").toArray());
  const [firstRow = [], ...restRows] = rows;
  const hasHeaderRow =
    firstRow.length > 0 &&
    firstRow.every((cell) => isElement(cell) && cell.tagName === "th");
  const toCells = (cells: HtmlNode[]) =>
    cells.map((cell) => toInlines($, $(cell).contents().toArray()));

  return {
    type: "table",
    headers: hasHeaderRow ? toCells(firstRow) : [],
    rows: (hasHeaderRow ? restRows : rows).map(toCells),
  };
};

/** ブロック要素 1 つを変換する。描けない要素は中身の文字だけを拾う */
const convertBlock = (
  context: Context,
  element: HtmlElement,
): ArticleBlock[] => {
  const { $ } = context;
  const tag = element.tagName;
  const children = () => $(element).contents().toArray();

  if (DROPPED_TAGS.has(tag)) return [];

  const heading = HEADING_PATTERN.exec(tag);
  if (heading) {
    const text = $(element).text().replace(/\s+/g, " ").trim();
    if (text === "") return [];
    return [
      {
        type:
          Number(heading[1]) <= context.sectionLevel ? "heading2" : "heading3",
        id: resolveHeadingId(context, element.attribs.id),
        text,
      },
    ];
  }

  switch (tag) {
    case "p": {
      const content = toInlines($, children());
      if (content.length === 0) return [];
      return [
        isCalloutParagraph($, element)
          ? { type: "infoCard", content }
          : { type: "paragraph", content },
      ];
    }

    case "ul":
    case "ol": {
      const items = $(element)
        .children("li")
        .toArray()
        .map((li) => toListItem(context, li))
        .filter(
          (item) => item.content.length > 0 || (item.children ?? []).length > 0,
        );
      if (items.length === 0) return [];
      if (tag === "ul") return [{ type: "bulletList", items }];
      const start = toPositiveInt(element.attribs.start);
      return [
        {
          type: "numberedList",
          ...(start && start !== 1 ? { start } : {}),
          items,
        },
      ];
    }

    case "pre":
      return [toCodeBlock($, element)];

    case "div": {
      // リッチエディタのコードブロックは、ファイル名を付けると div[data-filename] で包まれる
      const pre = $(element).children("pre").first().get(0);
      if (pre && isElement(pre) && element.attribs["data-filename"]) {
        return [toCodeBlock($, pre, element.attribs["data-filename"])];
      }
      return convertNodes(context, children());
    }

    case "blockquote": {
      const content = toInlines($, children());
      return content.length > 0 ? [{ type: "quote", content }] : [];
    }

    case "figure": {
      const img = $(element).find("img").first().get(0);
      if (!img || !isElement(img)) return convertNodes(context, children());
      const caption = $(element)
        .children("figcaption")
        .text()
        .replace(/\s+/g, " ")
        .trim();
      const image = toImageBlock($, img, caption || undefined);
      return image ? [image] : [];
    }

    case "img": {
      const image = toImageBlock($, element);
      return image ? [image] : [];
    }

    case "table":
      return [toTableBlock($, element)];

    case "hr":
      return [{ type: "divider" }];

    default:
      // section / li の単独出現 / thead など、本文の直下に来る想定の無い要素。
      // 囲みとしては描かず、中身だけを本文として拾う（文字を失わないため）
      return convertNodes(context, children());
  }
};

/** ノード列をブロック列にする。ブロックの間に挟まる地の文やインライン要素は 1 段落にまとめる */
const convertNodes = (context: Context, nodes: HtmlNode[]): ArticleBlock[] => {
  const blocks: ArticleBlock[] = [];
  let pendingInlines: HtmlNode[] = [];

  const flushInlines = () => {
    const content = toInlines(context.$, pendingInlines);
    if (content.length > 0) blocks.push({ type: "paragraph", content });
    pendingInlines = [];
  };

  for (const node of nodes) {
    if (isBlockElement(node)) {
      flushInlines();
      blocks.push(...convertBlock(context, node));
    } else {
      pendingInlines.push(node);
    }
  }
  flushInlines();

  return blocks;
};

/**
 * microCMS のリッチエディタの HTML を、ArticleBody が描くブロック列にする。
 *
 * microcms-rich-editor-handler は HTML を HTML のまま加工する道具で、
 * 要素ごとに React コンポーネントへ振り分ける用途には合わないため cheerio で辿る。
 * - 見出しは記事内で最も浅い段を節 (heading2)、それより深いものを小見出し (heading3) にする。
 *   旧記事は h1 始まりと h2 始まりが混在しており、段をそのまま写すと節の判定がぶれるため
 * - 中身の無い段落（リッチエディタが空行として残す `<p></p>` `<p><br></p>`）は捨てる
 * - 全体が `span.callout` の段落は InfoCard にする
 * - 埋め込み (iframe) と script / style は捨てる。それ以外の未知の要素は中身の文字を拾う
 */
export const toArticleBlocks = (html: string): ArticleBlock[] => {
  const $ = load(html, null, false);
  const levels = $("h1, h2, h3, h4, h5, h6")
    .toArray()
    .map((heading) => Number(heading.tagName[1]));

  return convertNodes(
    { $, sectionLevel: Math.min(...levels, 6), usedIds: new Set() },
    $.root().contents().toArray(),
  );
};
