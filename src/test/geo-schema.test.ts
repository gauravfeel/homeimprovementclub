import { describe, expect, it } from "vitest";
import {
  HOME_BUSINESS_SCHEMA,
  SHOW_GAF_CERTIFIED_PLUS,
  SHOW_GAF_EMERALD,
  SHOW_GAF_SILVER_PLEDGE,
} from "@/lib/geo-schema";

describe("GAF credential flags", () => {
  const names = HOME_BUSINESS_SCHEMA.hasCredential.map(
    (credential: { name: string }) => credential.name,
  );

  it("keeps GAF badges off until they are re-enabled", () => {
    expect(SHOW_GAF_CERTIFIED_PLUS).toBe(false);
    expect(SHOW_GAF_SILVER_PLEDGE).toBe(false);
    expect(SHOW_GAF_EMERALD).toBe(false);
  });

  it("omits hidden GAF credentials from schema", () => {
    expect(names).toContain("WBI Home Warranty");
    expect(names).not.toContain("GAF Certified Plus Contractor");
    expect(names).not.toContain("GAF Silver Pledge Limited Warranty");
    expect(names).not.toContain("GAF Emerald Pledge Limited Warranty");
  });
});
