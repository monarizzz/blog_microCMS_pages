import { ImageResponse } from "next/og";
import { siteName } from "@/commons/constants/site";

export const alt = siteName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OGP 画像。全ページ共通の既定画像として使う。
 * ImageResponse の既定フォントは日本語グリフを持たず豆腐になるため、
 * 描画する文字はラテン文字だけに絞っている。
 */
const OpengraphImage = () => {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        // ImageResponse は CSS 変数を解決できないため、
        // tokens.css の surface / on-surface の実値を直接書いている
        backgroundColor: "#f9fafb",
        color: "#181b1d",
      }}
    >
      <div style={{ fontSize: 120, letterSpacing: -4 }}>{siteName}</div>
      <div style={{ fontSize: 36, color: "#636a6f" }}>
        Notes on web development
      </div>
    </div>,
    size,
  );
};

export default OpengraphImage;
