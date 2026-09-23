"use client";

import { useEffect } from "react";
import type { CSSProperties } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

// global-error は layout.tsx ごと落ちたときの受け皿で、その layout が読み込む
// globals.css / tokens.css も next/font も適用されない前提で書く必要がある。
// そのため Tailwind のクラスやトークン変数は使わず、tokens.css と同値の
// リテラルをインラインスタイルで直接指定して自己完結させている。
const surface = "#f9fafb"; // --token-color-surface
const onSurface = "#181b1d"; // --token-color-on-surface
const onSurfaceVariant = "#636a6f"; // --token-color-on-surface-variant
const primary = "#181b1d"; // --token-color-primary
const onPrimary = "#f9fafb"; // --token-color-on-primary

const bodyStyle: CSSProperties = {
  margin: 0,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "24px",
  padding: "64px 40px",
  backgroundColor: surface,
  color: onSurface,
  // next/font が無効なので、素の環境で読める書体名だけを並べる
  fontFamily:
    '"Noto Sans JP", "Hiragino Kaku Gothic ProN", system-ui, sans-serif',
  fontSize: "0.875rem",
  lineHeight: 1.6,
  letterSpacing: "0.2px",
  textAlign: "center",
};

const GlobalError = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ja">
      <body style={bodyStyle}>
        <h1 style={{ margin: 0, fontSize: "1.512rem", fontWeight: 700 }}>
          問題が発生しました。
        </h1>
        <p style={{ margin: 0, color: onSurfaceVariant }}>
          ページを表示できませんでした。時間をおいて再度お試しください。
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            border: "none",
            borderRadius: "9999px",
            padding: "14px 28px",
            backgroundColor: primary,
            color: onPrimary,
            font: "inherit",
            cursor: "pointer",
          }}
        >
          再試行
        </button>
        {error.digest && (
          <p
            style={{
              margin: 0,
              fontSize: "0.7292rem",
              color: onSurfaceVariant,
            }}
          >
            エラーID: {error.digest}
          </p>
        )}
      </body>
    </html>
  );
};

export default GlobalError;
