import type { ArticleDetail } from "../types/articleDetail";
import type { PostNavigation } from "../types/postNavigation";

/**
 * ストーリー用の記事詳細。blocks は MOCK_ARTICLE_CONTENT_HTML（articleDetailHtml.ts）を
 * toArticleBlocks で変換した結果をそのまま置いている。
 * ストーリーはブラウザで動くため、Node 向けの cheerio をここで import して変換はしない
 */
export const mockArticleDetail: ArticleDetail = {
  title: "SourceTree でブランチをリネームしたら Push 先が変わらなかった",
  tags: ["Git", "備忘録"],
  publishedAt: "2026-07-25T13:04:39.439Z",
  publishedDate: "2026.07.25",
  blocks: [
    {
      type: "paragraph",
      content: [
        {
          text: "SourceTree でブランチを ",
        },
        {
          text: "main",
          marks: ["code"],
        },
        {
          text: " から ",
        },
        {
          text: "dev",
          marks: ["code"],
        },
        {
          text: " にリネームしたら、Push 先が ",
        },
        {
          text: "origin/main のまま",
          marks: ["bold"],
        },
        {
          text: "になっていた。",
        },
      ],
    },
    {
      type: "heading2",
      id: "h787ecfa34e",
      text: "経緯",
    },
    {
      type: "paragraph",
      content: [
        {
          text: "リネーム後に ",
        },
        {
          text: "git branch -vv",
          marks: ["code"],
        },
        {
          text: " を確認すると、追跡先が ",
        },
        {
          text: "gone",
          marks: ["code"],
        },
        {
          text: " になっていた。",
        },
      ],
    },
    {
      type: "code",
      language: "bash",
      code: "$ git branch -vv\n* dev  e0b570a [origin/main: gone] Merge pull request #91",
    },
    {
      type: "heading3",
      id: "h1f08a1e15c",
      text: "追跡先の設定",
    },
    {
      type: "code",
      filename: ".git/config",
      code: '[branch "dev"]\n      remote = origin\n      merge = refs/heads/main',
    },
    {
      type: "heading2",
      id: "h6a7bafcf87",
      text: "直し方",
    },
    {
      type: "numberedList",
      items: [
        {
          content: [
            {
              text: "リモートのブランチを確認する",
            },
          ],
        },
        {
          content: [
            {
              text: "追跡先を付け替える",
            },
          ],
          children: [
            {
              type: "code",
              language: "bash",
              code: "$ git branch -u origin/dev dev",
            },
          ],
        },
      ],
    },
    {
      type: "table",
      headers: [
        [
          {
            text: "コマンド",
          },
        ],
        [
          {
            text: "役割",
          },
        ],
      ],
      rows: [
        [
          [
            {
              text: "git branch -vv",
            },
          ],
          [
            {
              text: "追跡先を確認する",
            },
          ],
        ],
        [
          [
            {
              text: "git branch -u",
            },
          ],
          [
            {
              text: "追跡先を付け替える",
            },
          ],
        ],
      ],
    },
    {
      type: "infoCard",
      content: [
        {
          text: "リネームはローカルだけで完結しない。\nリモートの追跡先も合わせて直す。",
        },
      ],
    },
    {
      type: "quote",
      content: [
        {
          text: "ブランチ名を変えたら、追跡先も変わったか確かめる。",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "heading2",
      id: "hb4dd86d070",
      text: "まとめ",
    },
    {
      type: "bulletList",
      items: [
        {
          content: [
            {
              text: "リネームしても追跡先は変わらない",
            },
          ],
          children: [
            {
              type: "bulletList",
              items: [
                {
                  content: [
                    {
                      text: "詳しくは ",
                    },
                    {
                      text: "git branch のドキュメント",
                      href: "https://git-scm.com/docs/git-branch",
                    },
                    {
                      text: " を参照",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          content: [
            {
              text: "SourceTree で直す",
              marks: ["strike"],
            },
            {
              text: " CLI で直す",
            },
          ],
        },
      ],
    },
  ],
};

export const mockPostNavigation: PostNavigation = {
  prev: {
    id: "yne3ngv6zks",
    title: "Windowsのアプリケーションごとのアクティブ時間を記録する",
  },
  next: { id: "jbbq1nju-0ux", title: "Treasure体験記【CARTA HOLDINGS】" },
};
