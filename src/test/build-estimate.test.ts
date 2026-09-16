import { describe, expect, it } from "vitest";
import { estimateBuildCost, formatCad } from "@/lib/build-estimate";

describe("build cost estimator", () => {
  it("multiplies area by rate", () => {
    expect(estimateBuildCost(2500, 250)).toBe(625000);
    expect(estimateBuildCost(1000, 150)).toBe(150000);
    expect(estimateBuildCost(10000, 700)).toBe(7000000);
  });

  it("formats CAD without cents", () => {
    expect(formatCad(625000)).toMatch(/625,000/);
  });
});
