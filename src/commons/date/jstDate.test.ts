import { describe, expect, it } from "vitest";

import { toJstDate, toJstDateAttr } from "./jstDate";

describe("toJstDate", () => {
  it("JST 0〜9 時 (UTC 15〜24 時) の日時は UTC の翌日を返す", () => {
    expect(toJstDate("2024-03-17T15:00:00.000Z")).toBe("2024.03.18");
    expect(toJstDate("2024-03-17T15:30:00.000Z")).toBe("2024.03.18");
    expect(toJstDate("2024-03-17T23:59:59.999Z")).toBe("2024.03.18");
  });

  it("JST 9 時以降 (UTC 0〜15 時) の日時は UTC と同じ日付を返す", () => {
    expect(toJstDate("2024-03-18T00:00:00.000Z")).toBe("2024.03.18");
    expect(toJstDate("2024-03-18T14:59:59.999Z")).toBe("2024.03.18");
  });

  it("月末・年末の境界でも JST の日付に繰り上がる", () => {
    expect(toJstDate("2024-03-31T15:00:00.000Z")).toBe("2024.04.01");
    expect(toJstDate("2023-12-31T15:00:00.000Z")).toBe("2024.01.01");
  });
});

describe("toJstDateAttr", () => {
  it("toJstDate と同じ JST の日付を HTML の日付形式 (YYYY-MM-DD) で返す", () => {
    expect(toJstDateAttr("2024-03-17T15:30:00.000Z")).toBe("2024-03-18");
    expect(toJstDateAttr("2024-03-18T00:00:00.000Z")).toBe("2024-03-18");
  });
});
