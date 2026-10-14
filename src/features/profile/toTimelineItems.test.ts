import { describe, expect, it } from "vitest";

import type { Milestone } from "@/infra/microCMS/schema/profile";

// vitest の node プロジェクトは tsconfig の paths を解決しないため、値の import は相対パスにする
import { mockService } from "../service/mocks/services";
import { toTimelineItems } from "./toTimelineItems";

const milestone = (
  date: string,
  title: string,
  emphasized?: boolean,
): Milestone => ({ fieldId: "milestone", date, title, emphasized });

describe("toTimelineItems", () => {
  it("目盛りが無い (null / undefined / []) ときは実績の行だけを返す", () => {
    const experiences = [
      mockService("a", { startDate: "2025-08-31T15:00:00.000Z" }),
    ];

    for (const milestones of [null, undefined, []]) {
      expect(
        toTimelineItems(experiences, milestones).map((item) => item.id),
      ).toEqual(["a"]);
    }
  });

  it("目盛りは JST の年だけを出し、emphasized なら lg、それ以外は sm にする", () => {
    const items = toTimelineItems(
      [],
      [
        // JST では 2020-01-01。UTC の年 (2019) を出さない
        milestone("2019-12-31T15:00:00.000Z", "Clip Studio Paint"),
        milestone("2023-12-31T15:00:00.000Z", "Next.js / TypeScript", true),
      ],
    );

    expect(items).toEqual([
      {
        id: expect.any(String),
        year: "2020",
        title: "Clip Studio Paint",
        size: "sm",
      },
      {
        id: expect.any(String),
        year: "2024",
        title: "Next.js / TypeScript",
        size: "lg",
      },
    ]);
  });

  it("実績と目盛りを日付の昇順に混ぜ、同日は目盛りを先に置く", () => {
    const items = toTimelineItems(
      [
        mockService("same-day", { startDate: "2022-03-31T15:00:00.000Z" }),
        mockService("latest", { startDate: "2025-08-31T15:00:00.000Z" }),
      ],
      [
        milestone("2023-03-31T15:00:00.000Z", "later"),
        milestone("2022-03-31T15:00:00.000Z", "same-day"),
        milestone("2020-03-31T15:00:00.000Z", "earliest"),
      ],
    );

    expect(items.map((item) => item.title ?? item.id)).toEqual([
      "earliest",
      "same-day",
      "same-day",
      "later",
      "latest",
    ]);
    expect(items[1].project).toBeUndefined();
    expect(items[2].project).toBeDefined();
  });

  it("プロジェクトの連番は目盛りを飛ばして実績だけで数える", () => {
    const items = toTimelineItems(
      [
        mockService("a", { startDate: "2021-03-31T15:00:00.000Z" }),
        mockService("b", { startDate: "2025-08-31T15:00:00.000Z" }),
      ],
      [
        milestone("2020-03-31T15:00:00.000Z", "x"),
        milestone("2022-03-31T15:00:00.000Z", "y"),
      ],
    );

    expect(items.map((item) => item.project?.index)).toEqual([
      undefined,
      "01",
      undefined,
      "02",
    ]);
  });

  it("目盛りの id は互いにも実績の id とも衝突しない", () => {
    const items = toTimelineItems(
      [mockService("0", { startDate: "2025-08-31T15:00:00.000Z" })],
      [
        milestone("2020-03-31T15:00:00.000Z", "Blender"),
        milestone("2020-03-31T15:00:00.000Z", "Blender"),
      ],
    );

    const ids = items.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
