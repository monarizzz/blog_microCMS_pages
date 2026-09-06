import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Table from "./Table";

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <thead>
          <tr>
            <th>プロパティ</th>
            <th>型</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>string</td>
            <td>記事のタイトル</td>
          </tr>
          <tr>
            <td>publishedAt</td>
            <td>string</td>
            <td>公開日時 (ISO 8601)</td>
          </tr>
          <tr>
            <td>tags</td>
            <td>string[]</td>
            <td>紐づくタグ一覧</td>
          </tr>
        </tbody>
      </>
    ),
  },
};

/** 最終行に行見出し (th scope="row") と tfoot を含むケース。最終行グループの最終行だけ罫線が消えること */
export const WithRowHeaderAndFoot: Story = {
  args: {
    label: "料金表",
    children: (
      <>
        <thead>
          <tr>
            <th>プラン</th>
            <th>月額</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Free</th>
            <td>0 円</td>
          </tr>
          <tr>
            <th scope="row">Pro</th>
            <td>1,200 円</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">合計</th>
            <td>1,200 円</td>
          </tr>
        </tfoot>
      </>
    ),
  },
};
