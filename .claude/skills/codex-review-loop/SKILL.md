---
name: codex-review-loop
description: 全open PRを対象に、chatgpt-codex-connector[bot] のレビュー指摘を巡回・妥当性検証し、必要なら修正コミット・push・@codexメンション返信までを行う。継続監視には ScheduleWakeup で待機ループを回す。「codexのレビュー見て」「PRのcodexレビュー対応して」「codexからOKもらってないPR確認して」「レビュー帰ってきたら対応して」などで起動。対象は明示が無い限り全open PR。
---

# codex-review-loop

このリポジトリでは chatgpt-codex-connector[bot] が各PRに自動レビューコメント(P1/P2)を付ける。
人間(monarizzz)が対応し、`@codex` とメンションして再レビューを依頼する運用。
このスキルはその一巡の調査・対応・再依頼、および返信待ちの継続監視を行う。

## 全体の流れ

1. **調査**: `gh pr list --author monarizzz --state open` で全open PRを取得
2. 各PRについて `gh api repos/monarizzz/blog_microCMS_pages/pulls/<番号>/comments` でcodexの指摘コメント、
   `gh api repos/monarizzz/blog_microCMS_pages/issues/<番号>/comments` で人間の対応コメント・`@codex`メンション有無を確認
3. 状態を分類する:
   - 指摘なし(codexコメント0件) → 対象外
   - 指摘あり・未対応(人間の対応コメント/push が無い) → **修正対象**
   - 指摘あり・対応済みだが `@codex` 未送信 → **再レビュー依頼のみ**
   - `@codex` 送信済み・返信待ち → 監視継続
   - codexから承認/追加指摘の返信あり → 追加指摘なら再度2から、承認なら完了

## 調査はトークン節約のため下位モデルへ委任してよい

全PR分の `gh api` 呼び出しは件数が多くトークンを食うため、`Agent` ツールで
`model: haiku` のサブエージェントに調査(手順2-3の分類)だけを委任してよい。
ただし **分類結果は鵜呑みにせず、修正対象・再レビュー依頼対象それぞれ数件は
自分で `gh api ... comments` の生データを見て裏取りする**こと。
理由: 下位モデルは「コミットが既に分割されているのに、指摘の参照コミットハッシュが
古いままなので未対応と誤判定する」といった取り違えをすることがある
(実例: PR183, PR196 — 実際は既にコミット分割済みだったが、codexの指摘は分割前の
コミットハッシュを参照していたため一見「未対応」に見えた)。

## 修正対応

- 各PRのブランチ用worktreeは `.claude/worktrees/` 配下に既存のものがあることが多い。
  `git worktree list` で確認し、無ければ `git worktree add` で作る
- AGENTS.md の規約(1コミット=1コンポーネント/1論点、既存コンポーネント変更は独立コミット、
  コミット本文に状態数・推測箇所を明記)に従う
- コード修正の実作業(ファイル編集・`tsc --noEmit`)は `sonnet` サブエージェントに委任してよいが、
  **git操作(commit/push)とPRコメント投稿は自分(呼び出し元)で行う**こと。
  理由: `git commit`/`push`/`worktree add` を含む指示文はAuto Mode分類器にブロックされることがある
  (特に `force-with-lease` 等の危険操作をサブエージェントへの指示に含めると高確率でブロックされる)。
  サブエージェントには「ファイル編集とtsc確認のみ、gitは操作しない」と明記して依頼する
- 複数worktreeを並行操作する場合、サブエージェントが共有worktreeのブランチを
  勝手に切り替えることがある(実例: PR194対応で `feat/divider` 用worktreeが
  `feat/olqvm-divider` に切り替わってしまった)。作業後は `git status` / `git branch --show-current`
  で意図しないブランチ切り替えが起きていないか確認し、元に戻す
- 修正後は該当ブランチへ `git push`、PRに `@codex` から始まる日本語コメントで
  対応内容を簡潔に説明する
- 指摘が的外れ・誤解・(参照コミットハッシュが古いなどで)既に対応済みの場合は、
  コードは直さず理由を添えて日本語で説明コメントを返す

## 再レビュー依頼のみのPR

対応は既に完了しているが `@codex` メンションがまだのPRには、
`gh pr comment <番号> --body "@codex 対応済みです。再レビューをお願いします。"` を送るだけでよい。
件数が多い場合はループで一括送信してよい(1件ずつ `sleep 1` を挟む程度で十分)。

## 継続監視ループ

`@codex` を送った後、codexの再レビュー返信はすぐには来ない。
`ScheduleWakeup` で 900〜1500秒後に自分自身を再度呼び出すループを組む。
`prompt` には「全PRを対象に、直近の `@codex` メンションより後のcodexコメントが
無いか確認し、あれば妥当性検証→必要なら追加対応、無ければ待機継続」という主旨を書く。
このスキル(codex-review-loop)の存在を前提にしてよいので、詳細手順を毎回書き下す必要はなく
「codex-review-loop の要領で全PRの再レビュー返信を確認し対応せよ」で足りる。

全PRでcodexが承認 or 追加指摘なしになったら、ユーザーに完了報告して
`ScheduleWakeup(stop: true)` でループを終了する。
