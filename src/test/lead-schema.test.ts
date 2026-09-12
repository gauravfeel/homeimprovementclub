import { contactLeadSchema, popupLeadSchema } from "@/lib/lead-schema";
import { describe, expect, it } from "vitest";

describe("contactLeadSchema", () => {
  const valid = {
    firstName: "Alex",
    lastName: "Chen",
    email: "alex@example.com",
    phone: "(604) 555-0142",
    propertyAddress: "123 Main Street",
    city: "Vancouver",
    bestContactTime: "Morning",
    projectType: "Kitchen",
    budget: "25000",
    message: "Open the kitchen wall.",
    company: "",
  };

  it("accepts a complete contact lead", () => {
    const result = contactLeadSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.budget).toBe(25000);
  });

  it("rejects a short phone number", () => {
    const result = contactLeadSchema.safeParse({ ...valid, phone: "555" });
    expect(result.success).toBe(false);
  });

  it("rejects budget of 10000 or less", () => {
    expect(contactLeadSchema.safeParse({ ...valid, budget: "5000" }).success).toBe(false);
    expect(contactLeadSchema.safeParse({ ...valid, budget: "10000" }).success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactLeadSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });
});

describe("popupLeadSchema", () => {
  it("allows an empty optional phone", () => {
    const result = popupLeadSchema.safeParse({
      firstName: "Alex",
      email: "alex@example.com",
      phone: "",
    });
    expect(result.success).toBe(true);
  });
});
