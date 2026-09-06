import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind のクラスを結合する。
 * 単純な文字列連結だと同一詳細度のユーティリティが生成順で解決されるため、
 * 呼び出し側から渡された className が既定値を上書きできない。
 * tailwind-merge で競合するユーティリティを畳み、後勝ちを保証する。
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
