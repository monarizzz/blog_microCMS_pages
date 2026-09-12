/**
 * 必須の環境変数を検証する。未設定・空文字なら throw して設定漏れを明示する。
 *
 * 値は呼び出し側が `process.env.FOO` の形で静的に読み、この関数へ渡す。
 * `process.env[name]` の動的アクセスにしないのは、`NEXT_PUBLIC_` 付きの
 * 変数が静的な参照でしかビルド時にインライン展開されないため。
 * 動的アクセスにするとクライアント側で値が undefined になる。
 *
 * 呼び出し側で評価を遅らせたい場合は getter の中で呼ぶ
 * （`src/infra/microCMS/env.ts` のコメント参照）。
 */
export function requireEnv(name: string, value: string | undefined): string {
  if (value === undefined || value === "") {
    throw new Error(
      `環境変数 ${name} が設定されていません。.env.example を参照して設定してください（ローカルは .env.local、CI は Actions secrets、本番は Vercel の Environment Variables）。`,
    );
  }

  return value;
}
