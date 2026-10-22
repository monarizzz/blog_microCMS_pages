import { Fragment, type ReactNode } from "react";

import type { ArticleInline, InlineMark } from "../../types/articleInline";

type Props = {
  inlines: ArticleInline[];
};

/** 内側から順に包む。`code` を最も内側に置き、太字やリンクの中でも等幅の囲みが崩れないようにする */
const MARK_ORDER: InlineMark[] = [
  "code",
  "bold",
  "italic",
  "strike",
  "underline",
];

const wrapMark = (mark: InlineMark, children: ReactNode) => {
  switch (mark) {
    case "code":
      return (
        <code className="rounded-sm border border-outline-variant bg-surface-container-low px-2 py-1 font-mono text-base text-ac-danger">
          {children}
        </code>
      );
    case "bold":
      return <strong className="font-bold text-primary">{children}</strong>;
    case "italic":
      return <em className="italic">{children}</em>;
    case "strike":
      return <s className="text-on-surface-variant">{children}</s>;
    case "underline":
      return <u>{children}</u>;
  }
};

/** `\n` を `<br>` にする。本文は外部 CMS の文字列なので HTML としては解釈させない */
const withLineBreaks = (text: string) =>
  text.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** 本文 1 区間ぶんの装飾済みテキストを並べる。外側の `p` などは呼び出し側が持つ */
const ArticleInlineText = ({ inlines }: Props) => {
  return inlines.map(({ text, marks = [], href }, index) => {
    let node: ReactNode = withLineBreaks(text);

    for (const mark of MARK_ORDER) {
      if (marks.includes(mark)) {
        node = wrapMark(mark, node);
      }
    }

    if (href) {
      // pen のリンク (s3ysnK) は色だけで下線が無い。色だけだと
      // 色覚によっては地の文と見分けられないため、下線を足している
      node = (
        <a
          href={href}
          className="text-ac-info underline underline-offset-2"
          {...(isExternal(href)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {node}
        </a>
      );
    }

    return <Fragment key={index}>{node}</Fragment>;
  });
};

export default ArticleInlineText;
