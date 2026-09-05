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
